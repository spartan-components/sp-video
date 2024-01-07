import { html, css, LitElement } from 'lit-element';
import { baseStyles } from '@spartan-components/base-styles'

const constructIframe = (videoId, provider, customBaseUrl, customAllow) => {
  const config = {
    baseUrl: {
      'youtube': 'https://www.youtube.com/embed/',
      'youtube-nocookie': 'https://www.youtube-nocookie.com/embed/',
      'vimeo': 'https://player.vimeo.com/video'
    },
    allow: {
      'youtube': ['accelerometer', 'autoplay', 'encrypted-media', 'gyroscope', 'picture-in-picture'],
      'youtube-nocookie': ['accelerometer', 'autoplay', 'encrypted-media', 'gyroscope', 'picture-in-picture'],
      'vimeo': ['autoplay', 'fullscreen']
    }
  }

  return html`
  <div class="frame">
    <iframe
      title="Youtube with Video ID: ${videoId}"
      frameborder="0"
      src="${customBaseUrl || config.baseUrl[provider]}/${videoId}?autoplay=1"
      allow="${customAllow || config.allow[provider].join(', ')}"
      allowfullscreen
    ></iframe>
  </div>
  `;
}

const initialTemplate = html`
  <div class="frame">
    <slot name="thumbnail"></slot>
  </div>
  <div class="pin content-wrapper">
    <slot name="controller"></slot>
  </div>`;

const cookieNotice = html`
  <div class="frame">
    <slot name="thumbnail"></slot>
  </div>
  <div class="pin content-wrapper dim">
    <slot name="cookieNotice"></slot>
  </div>`;

export class SpVideo extends LitElement {

  static properties = {
    customAllow: { type: Array },
    customBaseUrl: { type: String },
    provider: { type: String },
    state: {
      type: String
    },
    videoId: {
      type: String,
      attribute: 'video-id'
    },
    videoLoaded: {
      type: Boolean,
      attribute: 'video-loaded',
      reflect: true
    }
  }

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          font-family: var(--font-stack);
          display: block;
          position: relative;
        }
        /* unhide elements when defined */
        ::slotted([class="hidden-when-undefined"]) { display: block!important; }
        .frame {
          padding-bottom: var(--frame-padding-top, 56.25%);
          position: relative;
        }
        ::slotted(img),
        ::slotted(picture),
        ::slotted(span),
        iframe,
        .pin {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          position: absolute;
          width: 100%;
        }
        .content-wrapper {
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .content-wrapper.dim {
          box-sizing: border-box;
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(1em);
          overflow: scroll;
          padding: 0 1em;
        }`
    ];
  }

  constructor() {
    super();
    this.provider = '';
    this.state = 'initial';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    if(name === 'video-loaded') {
      this.setState();
    }
  }

  static constructKey(provider) {
    return `${provider}CookiesAccepted`;
  }

  _onClick(event) {
    const clickedElement = event.composedPath()[0];
    if (clickedElement.getAttribute('slot') === 'controller') this.setState();
    if (clickedElement.id === 'acceptCookies') {
      const saveChoiceEl = this.querySelector('#saveChoice');
      const saveChoice = saveChoiceEl.checked;
      const key = SpVideo.constructKey(this.provider);
      if (saveChoice) localStorage.setItem(key, true);
      this.state = 'renderVideo';
    }
  }

  checkIfCookiesAccepted() {
    const key = SpVideo.constructKey(this.provider);
    const _accepted = localStorage.getItem(key);
    const accepted = JSON.parse(_accepted);
    return accepted;
  }

  setState() {
    const cookieNoticeSlot = this.querySelector('[slot=cookieNotice]');
    if (this.checkIfCookiesAccepted() || !cookieNoticeSlot) {
      this.state = 'renderVideo'
    } else {
      this.state = 'renderNotice'
    }
  }

  render() {
    if (this.state === 'initial') {
      return initialTemplate;
    }
    if (this.state === 'renderNotice') {
      return cookieNotice;
    }
    return constructIframe(this.videoId, this.provider)
  }
}

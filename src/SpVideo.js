import { html, css, LitElement } from 'lit-element';
import { baseStyles } from '@spartan-components/base-styles'

const constructIframe = (videoId, provider, customBaseUrl, customAllow) => {
  const config = {
    baseUrl: {
      'youtube': 'https://www.youtube.com/embed/',
      'youtube-nocookie': 'https://www.youtube-nocookie.com/embed/',
      'vimeo': 'https://www.youtube-nocookie.com/embed/'
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
      frameborder="0"
      src="${customBaseUrl || config.baseUrl[provider]}/${videoId}?autoplay=1"
      allow="${customAllow || config.allow[provider].join(', ')}"
      allowfullscreen
    ></iframe>
  </div>
  `;
}

export class SpVideo extends LitElement {

  constructor() {
    super();
    this.videoLoaded = false;
  }

  static get properties() {
    return {
      customAllow: { type: Array },
      customBaseUrl: { type: String },
      provider: { type: String },
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
          padding-bottom: 56.25%;
          position: relative;
        }
        ::slotted(img),
        ::slotted(picture),
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
        .button-wrapper {
          align-items: center;
          display: flex;
          justify-content: center;
        }`
    ];
  }

  connectedCallback() {
    // listen to all clicks on element
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
      this._showVideo();
    }
  }

  _onClick(event) {
    // If the node is not a button nothing has to be done
    if (event.target.nodeName !== 'BUTTON')
      return;
    // else -> show iframe
    this._showVideo();
  }

  _showVideo() {
    this.videoLoaded = true;
    this.requestUpdate();
  }

  render() {
    return html`
    ${!this.videoLoaded ?
      html`
      <div class="frame">
        <slot name="thumbnail"></slot>
      </div>
      <div class="pin button-wrapper">
        <slot name="controller"></slot>
      </div>
      `:
      constructIframe(this.videoId, this.provider)
    }
    `;
  }
}

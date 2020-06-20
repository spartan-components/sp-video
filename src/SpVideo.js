import { html, css, LitElement } from 'lit-element';
import { BaseStyles } from '@spartan-components/base-styles';

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
      src="${config.baseUrl[provider]}/${videoId}"
      allow="${config.allow[provider].join(', ')}"
      allowfullscreen
    ></iframe>
  </div>
  `;
}

export class SpVideo extends LitElement {

  constructor() {
    super();
    this.iframeVisible = false;
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
    }
  }

  static get styles() {
    return [
      BaseStyles,
      css`
        :host {
          /* new basic styles */
          --size-000: 0.08rem;
          --size-100: 0.16rem;
          --size-200: 0.4rem;
          --size-300: 0.8rem;
          --size-400: 1.6rem;
          --size-500: 4rem;
          --size-600: 6rem;
          --size-700: 8rem;
          --size-800: 14rem;
          --size-900: 32rem;
          --transition-speed: 300ms;

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

  _onClick(event) {
    // If the node is not a button nothing has to be done
    if (event.target.nodeName !== 'BUTTON')
      return;
    // else -> show iframe
    this.iframeVisible = true;
    this.requestUpdate();
  }

  render() {
    return html`
    ${!this.iframeVisible ?
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

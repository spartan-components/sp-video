import { html, css, LitElement } from 'lit-element';
import { BaseStyles } from '@spartan-components/base-styles';

// Todo: add option for using custom iframes

function constructIframe(id, provider) {
  
  const basePath = {
    youtube: 'https://www.youtube-nocookie.com/embed',
    vimeo: 'https://player.vimeo.com/video'
  };

  const config = {
    youtube: ['accelerometer', 'autoplay', 'encrypted-media', 'gyroscope', 'picture-in-picture'],
    vimeo: ['autoplay', 'fullscreen']
  }

  if (provider) {
    return html`
      <div class="frame">
        <iframe frameborder="0" src="${basePath[provider]}/${id}" allow="${config[provider].join(', ')}" allowfullscreen></iframe>
      </div>`;
  }
  return html`<p>no provider specified</p>`
}

export class SpVideo extends LitElement {
  static get styles() {
    return [
      BaseStyles,
      css`
        :host {
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
          --button-background-color: #fafafa;
          --button-text-color: #212121;
          --button-border-style: none;
          --button-border-radius: 3px;
          --button-padding: var(--size-300) var(--size-400);
          --button-letter-spacing: var(--size-000);
          --button-text-transform: uppercase;
          font-family: var(--font-stack);
          display: block;
          position: relative;
        }
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
        ::slotted(img),
        ::slotted(picture),
        iframe {
          object-fit: cover;
          overflow: hidden;
        }
        .button-wrapper {
          align-items: center;
          display: flex;
          justify-content: center;
        }
        button {
          background-color: var(--button-background-color);
          border: var(--button-border-style);
          color: var(--button-text-color);
          border-radius: var(--button-border-radius);
          font-family: inherit;
          letter-spacing: var(--button-letter-spacing);
          padding: var(--button-padding);
          text-transform: var(--button-text-transform);
          transition: var(--transition-speed) ease;
        }
        button[invertable]:hover {
          background-color: var(--button-text-color);
          color: var(--button-background-color);
        }`
    ];
  }

  static get properties() {
    return {
      showIframe: { type: Boolean },
      text: { type: String },
      provider: { type: String },
      videoId: {
        type: String,
        attribute: 'video-id'
      }
    };
  }

  constructor() {
    super();
    this.showIframe = false;
  }

  render() {
    return html`
      ${!this.showIframe
        // conditionally render iframe:
        // if showIframe = false (first case, after '?') -> button is shown
        // if showIframe = true (second case, after ':') -> iframe is shown
        ? html`
          <div class="frame">
            <slot name="thumbnail"></slot>
          </div>
          <div class="pin button-wrapper">
            <button invertable @click="${this.handleClick}">${this.text}</button>
          </div>`
        : constructIframe(this.videoId, this.provider, this.rawIframe)
      }`;
  }

  handleClick() {
    this.showIframe = !this.showIframe;
    this.setAttribute('visible', '');
  }
}

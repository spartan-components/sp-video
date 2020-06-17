import { html, css, LitElement } from 'lit-element';

// Todo: make custom iframe string working

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
    return css`
      :host {
        display: block;
      }
      .frame {
        padding-bottom: 56.25%;
        position: relative;
      }
      ::slotted(img),
      ::slotted(picture),
      iframe {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        position: absolute;
        width: 100%;
      }`;
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
          <button @click="${this.handleClick}">${this.text}</button>`
        : constructIframe(this.videoId, this.provider, this.rawIframe)
      }`;
  }

  handleClick() {
    this.showIframe = !this.showIframe;
    this.setAttribute('visible', '');
  }
}

# \<sp-video>

> Lazy-loaded vimeo and youtube iframes (loads on user click)

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i @spartan-components/sp-video
```

## Usage
```html
<!-- Import module -->
<script type="module">
  import '@spartan-components/sp-video/sp-video.js';
</script>

<!-- Supported Providers: youtube, youtube-nocookie, vimeo -->
<sp-video
  provider="youtube-nocookie"
  video-id="K5DkT_zrzaw"
>
  <!-- Custom thumbnail image, declared as slot="thumbnail" -->
  <img
    slot="thumbnail"
    width="720"
    height="405"
    loading="lazy"
    src="https://img.youtube.com/vi/K5DkT_zrzaw/maxresdefault.jpg"
    alt=""
  />
  <!-- Custom video controller, declared as slot="controller", iframe loads on click -->
  <button
    slot="controller"
    class="hidden-when-undefined"
  >
    Play video
  </button>
  <!-- Fallback for browsers that don't support custom elements, has to use class="fallback-link" -->
  <a
    href="https://www.youtube.com/watch?v=K5DkT_zrzaw"
    class="fallback-link"
    target="blank"
    rel="noopener noreferrer"
  >
    Open video in new tab
  </a>
</sp-video>
```



## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
# <sp-video />

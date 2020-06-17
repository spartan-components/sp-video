# \<sp-video>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i sp-video
```

## Usage
```html
<script type="module">
  import 'sp-video/sp-video.js';
</script>

<sp-video video-id="a_0QSRlRJuI" provider="youtube" text="Video abspielen">
  <img slot="thumbnail" src="https://img.youtube.com/vi/a_0QSRlRJuI/maxresdefault.jpg" />
  <a slot="video-controller" href="https://www.youtube.com/watch?v=a_0QSRlRJuI" target="black">Video in neuem Tab öffnen</a>
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

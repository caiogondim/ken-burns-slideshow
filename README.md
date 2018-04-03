<img src="http://rawgit.com/caiogondim/ken-burns-slideshow/master/img/logo/logo.svg">

# ken-burns-slideshow

A slideshow in JS with the Ken Burns effect.

## Install

```bash
npm install --save ken-burns-slideshow
```

## Usage

Put a list of images on HTML:
```html
<ul>
    <li><img src="http://path-to-your-image"></li>
    <li><img src="http://path-to-your-image"></li>
    <li><img src="http://path-to-your-image"></li>
</ul>
```

Start the library
```javascript
var slideshow = new KenBurnsSlideshow({
    el: document.querySelector('ul')
})
```

## API

### contructor `new KenburnsSlideshow`

Creates in memory a new `KenBurnsSlideshow`. No side effects.

Properties passed on instantiation time

- `props.el`
  - Type: `HTMLElement`
  - Required: `true`
- `props.transitionDelay`
 - Type: `Number`
 - Default: 7000
- `props.cssPrefix`
  - Type: `String`
  - Default: 'ken-burns-slideshow'

### `init`

Starts the slideshow behaviour.

### `stop`

Stops the slideshow.

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)

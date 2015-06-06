'use strict'

var fs = require('fs')
var insertCss = require('insert-css')

// Class
// -----

function KenBurnsSlideshow (props) {
  this.props = setProps(props)

  this.state = {
    // 'true' if the slideshow is runing.
    isRunning: false,
    // DOM node of currently visible slide.
    slideVisibleEl: null,
    // Number of currently visible slide.
    slideVisibleNum: null,
    // Holds the `setInterval` reference.
    interval: null  
  }
}

// Public
// ------

KenBurnsSlideshow.prototype.init = function init () {
  injectCss(this.props.cssPrefix, this.props.transitionDelay)
  injectHtml(this.props.el, this.props.cssPrefix)
  randomizeEffectOrigin(this.props.el, this.props.cssPrefix)
  
  this.state.interval = startSlide(this.props, this.state)
  this.state.isRunning = true
  this.state.slideVisibleEl = this.props.el.querySelector('.' + this.props.cssPrefix + '--has-kenBurnsFx')
  this.state.slideVisibleNum = 0
}

KenBurnsSlideshow.prototype.stop = function stop () {
  clearInterval(this.state.interval)
  this.state.isRunning = false
}

// Private
// -------

function setProps (props) {
  var props_ = {}

  // Properties validation.
  if (!props.el) {
    throw new Error('Property `el` must be declared')
  }

  props_.el = props.el
  props_.cssPrefix = props.cssPrefix || 'ken-burns-slideshow'
  props_.transitionDelay = props.transitionDelay || 5000

  return props_
}

function injectHtml (el, cssPrefix) {
  el.classList.add(cssPrefix)

  ;[].forEach.call(el.querySelectorAll('li'), function (li) {
    li.classList.add(cssPrefix + '__slide')
  })

  ;[].forEach.call(el.querySelectorAll('img'), function (img, index) {
    if (index === 0) {
      img.classList.add(cssPrefix + '--has-kenBurnsFx')
    }
    img.classList.add(cssPrefix + '__slide-img')
  })
}

function injectCss (cssPrefix, transitionDelay) {
  var css = fs.readFileSync(__dirname + '/style.tmpl.css')
  css = css
    .toString()
    .replace(/{{prefix}}/g, cssPrefix)
    .replace(/{{transitionDelay}}/g, transitionDelay)
  insertCss(css)
}

function randomizeEffectOrigin (el, cssPrefix) {
  var yAxisOrigins = ['bottom', 'center', 'top']
  var xAxisOrigins = ['left', 'center', 'right']
  var slides = el.querySelectorAll('.' + cssPrefix + '__slide-img')

  ;[].forEach.call(slides, function (slide) {
    var xAxisOrigin = getRandomElement(xAxisOrigins)
    var yAxisOrigin = getRandomElement(yAxisOrigins)
    
    if (slide.style.webkitTransformOrigin !== undefined) {
      slide.style.webkitTransformOrigin =
        '' + xAxisOrigin + ' ' + yAxisOrigin
    } else {
      slide.style.transformOrigin =
        '' + xAxisOrigin + ' ' + yAxisOrigin
    }
  })
}

function getRandomElement (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function startSlide (props, state) {
  return setInterval(
    changeSlide.bind(null, props, state),
    props.transitionDelay
  )
}

function changeSlide (props, state) {
  var slides = props.el.querySelectorAll('.' + props.cssPrefix + '__slide-img')
  
  if (state.slideVisibleNum + 1 === slides.length) {
    state.slideVisibleNum = 0
  } else {
    state.slideVisibleNum += 1
  }

  state
    .slideVisibleEl
    .classList
    .remove(props.cssPrefix + '--has-kenBurnsFx')

  state.slideVisibleEl = slides[state.slideVisibleNum]
  
  state
    .slideVisibleEl
    .classList
    .add(props.cssPrefix + '--has-kenBurnsFx')
}

// Exports
// -------

module.exports = KenBurnsSlideshow

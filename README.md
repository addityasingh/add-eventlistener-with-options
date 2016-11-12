# add-eventlistener-with-options
A utility function to check if [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) supports adding `passive` (or `capture`, `once`) event options.

[![NPM](https://nodei.co/npm/add-eventlistener-with-options.png)](https://npmjs.org/package/add-eventlistener-with-options)

## Build status
[![Build Status](https://travis-ci.org/addi90/add-eventlistener-with-options.svg?branch=master)](https://travis-ci.org/addi90/add-eventlistener-with-options)

## Code coverage report using istanbul
![Code Coverage report](https://raw.githubusercontent.com/addi90/add-eventlistener-with-options/master/assets/code_coverage_20161112.png)

# Story behind Passive event listeners 

Passive event listeners are a new feature [in the DOM spec](https://dom.spec.whatwg.org/#dom-eventlisteneroptions-passive) that enable developers to opt-in to better scroll performance by eliminating the need for scrolling to block on touch and wheel event listeners.  Developers can annotate touch and wheel listeners with `{passive: true}` to indicate that they will never invoke `preventDefault`.  This feature [shipped in Chrome 51](https://www.chromestatus.com/features/5745543795965952), [Firefox 49](https://bugzilla.mozilla.org/show_bug.cgi?id=1266066) and [landed in WebKit](https://bugs.webkit.org/show_bug.cgi?id=158601). 


### The problem

Smooth scrolling performance is essential to a good experience on the web, especially on touch-based devices.
All modern browsers have a threaded scrolling feature to permit scrolling to run smoothly even when expensive
JavaScript is running, but this optimization is partially defeated by the need to wait for the results of
any `touchstart` and `touchmove` handlers, which may prevent the scroll entirely by calling [`preventDefault()`](http://www.w3.org/TR/touch-events/#the-touchstart-event) on the event. While there are particular scenarios where an author may indeed want to prevent scrolling, analysis indicates that the majority of touch event handlers on the web never actually
call `preventDefault()`, so browsers often block scrolling unneccesarily. For instance, in Chrome for Android 80% of the touch events that block scrolling never actually prevent it. 10% of these events add more than 100ms of delay to the start of scrolling, and a catastrophic delay of at least 500ms occurs in 1% of scrolls.

### Solution: the 'passive' option

Now that we have an extensible syntax for specifying options at event handler registration time, we can add a new `passive` option which declares up-front that the listener will never call `preventDefault()` on the event.  If it does, the user agent will just ignore the request (ideally generating at least a console warning). 

Now rather than having to block scrolling whenever there are any touch or wheel listener, the browser only needs to do this when there are *non-passive* listeners (see [TouchEvents spec](http://w3c.github.io/touch-events/#cancelability)).  `passive` listeners are free of performance side-effects.

This package provides a smooth fallback implementation to use the `{ passive: true }` option in newer browsers, while falling back to `false` value in older ones. 
Additionally, you could also use the method to use the `capture` and `once` options.

# Syntax
```javascript
addEventListenerWithOptions(target, 
  eventName, 
  listener, 
  options, 
  optionName);
```

 - `target`: The [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) element to use as the target of the event
 - `eventName`: Name of the event to be handled using the event listener. E.g. `touchstart`, `touchend`
 - `listener`: The event listener callback to be called on the event
 - `options`: Additional options
 - `optionName`: Defaults to `passive`. Use [`once`, `capture`] to override.

# Installation
Use it with `npm` as

```
npm install add-event-listener-with-options
```

# Example
- To add the `passive` event listeners as default

## ES6 syntax
```javascript
import addEventListenerWithOptions from 'add-eventlistener-with-options';

addEventListenerWithOptions(window, 'touchstart', () => {
    // Execute callback code
});
```

- The default option is `passive`, but you can even add `capture` or `once` options by passing them as the last parameter

```javascript
addEventListenerWithOptions(window, 'touchstart', () => {
    // Execute callback code
}, {}, 'capture');
```

# Performance test
There is a video showing the comparison of performance on [CNN website](https://www.cnn.com) here

<a href="https://www.youtube.com/watch?v=NPM6172J22g">
![demo video](https://cloud.githubusercontent.com/assets/39191/16223871/cab9f508-379f-11e6-8154-1d0a005ad071.png)
</a>

Additionally, I tested the change with below code and the Devtools Timline data ***before*** and ***after*** the change are shown below for a sample **Redux** application. The number of frames in green (< 16ms) is increased after adding the `passive` option as compared below:

### Before


```javascript
window.addEventListener('touchstart', (e) => {
  console.log('e.defaultPrevented', e.defaultPrevented);  // will be false 
  for (let i =0; i< 100; i++) {
    console.log(`i ${i}`);
    e.preventDefault(); // prevents the scroll because the event handler is not passive 
  }

  console.log('e.defaultPrevented', e.defaultPrevented);  // true 
});
```

![Before Passive ](https://raw.githubusercontent.com/addi90/add-eventlistener-with-options/master/assets/before-passive.png)

### After

```javascript
addEventListenerWithOptions(window, 'touchstart', (e) => {
  console.log('e.defaultPrevented', e.defaultPrevented);  // will be false 
  for (let i =0; i< 100; i++) {
    console.log(`i ${i}`);
    e.preventDefault(); // does nothing since the listener is passive 
  }

  console.log('e.defaultPrevented', e.defaultPrevented);  // still false 
});
```

![After Passive ](https://raw.githubusercontent.com/addi90/add-eventlistener-with-options/master/assets/after-passive.png)


# Reference and Credits
Most of the sources for implementing this comes from the [Web Platform Incubator Community Group](https://www.w3.org/blog/2015/07/wicg/) suggestion on [EventListenerOptions](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md)


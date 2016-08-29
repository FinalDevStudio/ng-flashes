# ng-flashes

Flash messages for AngularJS

## Installation

Using bower, install with this command:

```sh
bower install --save ng-flashes
```

Then add either the `dist/ng-flashes.js` for development or the `dist/ng-flashes.min.js` for production to your application scripts.

And finally, add the `ngFlashes` module to your AngularJS application dependencies.

## Usage

Add an element with the `ng-flashes-container` attribute to your HTML:

```html
<div ng-flashes-container></div>
```

Ideally, place this element after all other content so that the flash messages appear above anything else by default.

## Configuration

You can specify the template URL to use by adding an the `template-url` attribute to the directive element and setting it's value to the desired URL or by configuring the module during your application's configuration state:

### Directive

```html
<div ng-flashes-container template-url="/assets/templates/flashes.html"></div>
```

This has precedence over the default template specified by the configure method so you can have a default defined via the provider and supersede it with the directive's attribute.

### Configure method

```javascript
angular.module('MyApp').config([
  'ngFlashesProvider',

  function (ngFlashesProvider) {
    ngFlashesProvider.configure({
      templateUrl: '/assets/templates/flashes.html'
    });
  }
]);
```

### Configuration options

The `ngFlashesProvider` configure method accepts an `Object` with the following properties:

Property       | Type     | Description
-------------- | -------- | ---------------------------------------------------------------------
`templateUrl`  | `String` | Sets the default template URL for the directive.
`dismissDelay` | `Number` | The time that a flash message remains visible before being dismissed.

## Template

This module does not provide any template. You must provide your own.

### Example template

This examples are optimized for [Bootstrap](http://getbootstrap.com) with [FontAwesome](http://fontawesome.io) icons.

In Pug (Jade):

```pug
.flash(ng-repeat='flash in list')
  //- Construct Bootstrap alert class and assign click action
  .alert(
    ng-class='"alert-" + flash.type',
    ng-click='dismiss($index)')

    //- Assign FontAwesome icon based on type
    i.fa(ng-class='{\
      "fa-exclamation-triangle": flash.type === "danger",\
      "fa-exclamation-circle": flash.type === "warning",\
      "fa-check-circle": flash.type === "success",\
      "fa-info-circle": flash.type === "info"\
    }')

    strong(translate='{{ flash.title }}')
    span(translate='{{ flash.message }}')
```

In HTML:

```html
<div ng-repeat="flash in list" class="flash">
  <div ng-class="'alert-' + flash.type" ng-click="dismiss($index)" class="alert">
    <i ng-class="{ 'fa-exclamation-triangle': flash.type === 'danger', 'fa-exclamation-circle': flash.type === 'warning', 'fa-check-circle': flash.type === 'success', 'fa-info-circle': flash.type === 'info' }" class="fa"></i>

    <strong translate="{{ flash.title }}"></strong>
    <span translate="{{ flash.message }}"></span>
  </div>
</div>
```

The `dismiss` method is exposed by the directive to the element's isolated `$scope`.

## Style

This module works really well with `ngAnimate` so you can provide animation for each flash states:

### Example styles

This module does not provide any styles. You must provide your own.

#### Example in SCSS

This example uses the default variables from Bootstrap.

```scss
*[ng-flashes-container] {
  pointer-events: none;
  display       : block;
  position      : fixed;
  width         : 100%;
  bottom        : 0;
  left          : 0;

  .flash {
    padding   : 0 $padding-large-horizontal $padding-large-horizontal $padding-large-vertical;
    text-align: center;
    display   : block;
    overflow  : visible;
    width     : 100%;
    z-index   : 9999;
    max-height: 150px;

    &.ng-enter,
    &.ng-move {
      @include transition(all 432ms ease-in-out);
      @include scaleY(0);
      padding   : 0;
      max-height: 0;
      opacity   : 0;

      &.ng-enter-active,
      &.ng-move-active {
        @include scaleY(1);
        padding   : 0 $padding-large-horizontal $padding-large-horizontal $padding-large-vertical;
        max-height: 70px;
        opacity   : 1;
      }
    }

    &.ng-leave {
      @include transition(all 432ms ease-in-out);
      @include scaleY(1);
      padding   : 0 $padding-large-horizontal $padding-large-horizontal $padding-large-vertical;
      max-height: 70px;
      opacity   : 1;
    }

    &.ng-leave-active {
      @include scaleY(0);
      max-height: 0;
      padding   : 0;
      opacity   : 0;
    }

    .alert {
      @include box-shadow(0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23));
      pointer-events: auto;
      display       : inline-block;
      margin        : 0 auto;
      cursor        : pointer;
      position      : relative;
      border-radius : 1000px;
      outline       : 0;
      padding       : $padding-base-vertical $padding-large-horizontal $padding-base-vertical $padding-base-horizontal;
      line-height   : 1.618;

      i {
        padding-right: $padding-small-horizontal;
      }

      strong {
        padding-right: $padding-xs-horizontal;
      }
    }
  }
}
```

#### Example in CSS

```css
*[ng-flashes-container] {
  pointer-events: none;
  display: block;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

*[ng-flashes-container] .flash {
  padding: 0 16px 16px 10px;
  text-align: center;
  display: block;
  overflow: visible;
  width: 100%;
  z-index: 9999;
  max-height: 150px;
}

*[ng-flashes-container] .flash.ng-enter, *[ng-flashes-container] .flash.ng-move {
  -webkit-transition: all 432ms ease-in-out;
  -o-transition: all 432ms ease-in-out;
  transition: all 432ms ease-in-out;
  -webkit-transform: scaleY(0);
  -ms-transform: scaleY(0);
  -o-transform: scaleY(0);
  transform: scaleY(0);
  padding: 0;
  max-height: 0;
  opacity: 0;
}

*[ng-flashes-container] .flash.ng-enter.ng-enter-active, *[ng-flashes-container] .flash.ng-enter.ng-move-active, *[ng-flashes-container] .flash.ng-move.ng-enter-active, *[ng-flashes-container] .flash.ng-move.ng-move-active {
  -webkit-transform: scaleY(1);
  -ms-transform: scaleY(1);
  -o-transform: scaleY(1);
  transform: scaleY(1);
  padding: 0 16px 16px 10px;
  max-height: 70px;
  opacity: 1;
}

*[ng-flashes-container] .flash.ng-leave {
  -webkit-transition: all 432ms ease-in-out;
  -o-transition: all 432ms ease-in-out;
  transition: all 432ms ease-in-out;
  -webkit-transform: scaleY(1);
  -ms-transform: scaleY(1);
  -o-transform: scaleY(1);
  transform: scaleY(1);
  padding: 0 16px 16px 10px;
  max-height: 70px;
  opacity: 1;
}

*[ng-flashes-container] .flash.ng-leave-active {
  -webkit-transform: scaleY(0);
  -ms-transform: scaleY(0);
  -o-transform: scaleY(0);
  transform: scaleY(0);
  max-height: 0;
  padding: 0;
  opacity: 0;
}

*[ng-flashes-container] .flash .alert {
  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  pointer-events: auto;
  display: inline-block;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  border-radius: 1000px;
  outline: 0;
  padding: 6px 16px 6px 12px;
  line-height: 1.618;
}

*[ng-flashes-container] .flash .alert i {
  padding-right: 10px;
}

*[ng-flashes-container] .flash .alert strong {
  padding-right: 5px;
}
```

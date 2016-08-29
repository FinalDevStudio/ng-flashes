# ng-flashes

Flash messages for AngularJS

## Installation

Using bower, install with this command:

```sh
bower install --save ng-flashes
```

Then add either the `dist/ng-flashes.js` for development or the
`dist/ng-flashes.min.js` for production to your application scripts.

And finally, add the `ngFlashes` module to your AngularJS application
dependencies.

## Usage

Add an element with the `ng-flashes-container` attribute to your HTML:

```html
<div ng-flashes-container></div>
```

Ideally, place this element after all other content so that the flash messages
appear above anything else by default.

## Configuration

You can specify the template URL to use by adding an the `template-url`
attribute to the directive element and setting it's value to the desired URL or
by configuring the module during your application's configuration state:

### Directive

```html
<div ng-flashes-container template-url="/assets/templates/flashes.html"></div>
```

This has precedence over the default template specified by the configure method
so you can have a default defined via the provider and supersede it with the
directive's attribute.

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

The `ngFlashesProvider` configure method accepts an `Object` with the following
properties:

| Property       | Type     | Description                                                           |
|----------------|----------|-----------------------------------------------------------------------|
| `templateUrl`  | `String` | Sets the default template URL for the directive.                      |
| `dismissDelay` | `Number` | The time that a flash message remains visible before being dismissed. |

## v0.8.2

* Do not bother calling defineProperties without any descriptors.

## v0.8.1

* Generate the correct `expression` property for function expressions (escodegen support).

## v0.8.0

* Update dependencies.

## v0.7.0

* Use Facebook's fork of Esprima.

## v0.6.0

* Use recast's `visit` method instead of `traverse`.

## v0.5.2

* Ensure that static getters and setters work correctly.

## v0.5.1

* Ensure that getters and setters are enumerable.

## v0.5.0

* Ensure that classes run in strict mode.

## v0.4.3

* Use [ast-util](https://github.com/eventualbuddha/ast-util) for a variety of
  ast-generation tasks.

## v0.4.2

* Adhere to the spec by making class methods writable.

## v0.4.1

* Ensure extending `null` works.
* Ensure super calls in static methods of anonymous classes work.

## v0.4.0

* Add support for class expressions.
* Add support for anonymous classes.
* Ensure that super classes are captured at time of class definition.

## v0.3.3

* Fix a typo that caused default params in class method not to work.

## v0.3.2

* Ensure that rest and default params work in constructors.

## v0.3.1

* Ensure rest params work in class methods.
* Fix that there could not be a static and non-static property of the same name.

## v0.3.0

* Add support for static methods (thanks, @thomasAboyt).

## v0.2.0

* Change the API to be in line with es6-arrow-function and regenerator.

## v0.1.0

* Ensure that prototype properties are, by default, non-enumerable.

## v0.0.2

* README updates.

## v0.0.1

* Initial version of project.

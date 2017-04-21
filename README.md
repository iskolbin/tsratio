[![Build Status](https://travis-ci.org/iskolbin/tsratio.svg?branch=master)](https://travis-ci.org/iskolbin/lmergesort)
[![license](https://img.shields.io/badge/license-public%20domain-blue.svg)](http://unlicense.org/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Ratio
=====

Tiny [ratio math](https://en.wikipedia.org/wiki/Ratio) implementation using
Typescript. Stores numerator and denominator in separate numbers. All 
operations return new ratio instead of mutating existing one. Ratios is always stored in the simplest form.

new( num = 0, den = 1, noChecks = false )
-----------------------------------------

Creates new `Ratio` instance. Without arguments creates ratio with `0` in the
numerator and `1` in the denominator. With 1 argument creates ratio with the
denominator equals `1`. Third argument controls error throwing, by default
there are a lot of checks during construction.

### Errors

Error                                | Description
-------------------------------------|----------------------------------
`Ratio.ERROR_ARGUMENTS_NAN`          | Passed arguments are `NaN`
`Ratio.ERROR_NUMERATOR_NAN`          | First arguement is `NaN`
`Ratuo.ERROR_DENOMINATOR_NAN`        | Second argument is `NaN`
`Ratio.ERROR_ARGUMENTS_NOT_INTEGER`  | Passed arguments are not integer
`Ratio.ERROR_NUMERATOR_NOT_INTEGER`  | First argument is not integer
`Ratio.ERROR_DENOMINATOR_NOT_INTEGER`| Second argument is not integer
`Ratio.ERROR_DENOMINATOR_ZERO`       | Second argument is zero


Getters
=======

num => number
-------------

Returns numerator

den => number
-------------

Returns denominator

int => Ratio
------------

Returns integer part of the ratio

frac => Ratio
-------------

Returns fractional part of the ratio


Arithmetic operations
=====================

add( r: Ratio ) => Ratio
------------------------

Adds ratios.

sub( r: Ratio ) => Ratio
------------------------

Subracts ratios.

mul( r: Ratio ) => Ratio
------------------------

Multiplies ratios.

div( r: Ratio ) => Ratio
------------------------

Divides ratios. If numerator or `r` is zero `Ratio.ERROR_DIVISION_BY_ZERO`
error is thrown.

neg() => Ratio
--------------

Negation or ratio.

Logical opertions
=================

eq( r: Ratio ) => boolean
-------------------------

Checks if ratios are equal.

lt( r: Ratio ) => boolean
-------------------------

Checks if `this` ratio is less than `r`.

le( r: Ratio ) => boolean
-------------------------

Checks if `this` ratio is less or equal to `r`.

ne( r: Ratio ) => boolean
-------------------------

Checks if ratios are not equal.

gt( r: Ratio ) => boolean
-------------------------

Checks if `this` ratio is greater than `r`.

ge( r: Ratio ) => boolean
-------------------------

Checks if `this` ratio is greater or equal to `r`.


Utility
=======

toString() => string
--------------------

Returns string representation of the Ratio. If ratio is zero returns 
`"Ratio (0)"`. If ratio has denominator == 1, then returns `"Ratio (n)"` where
`n` is the numerator. Otherwise returns `"Ratio (n/d)"`, where `d` is the
denominator.

valueOf() => number
-------------------

Converts ratio to primitive number. Note that you can actually compare ratios
with primitive numbers without implicit conversion, i.e.

```js
new Ratio( 5, 2 ) == 2.5 // yields true
new Ratio( 0 ) == 0      // yields true
new Ratio( 0 ) === 0     // yields false, it's different objects
```

But because in many cases `==` is avoided, it's more like funny trick actually.

parse( s: number|string, overflowLimit = 2^53 ) => Ratio
--------------------------------------------------------

Parses number or string and returns new `Ratio`. If bad arguments are passed
or overflow accured during process the errors are thrown.

### Errors

Error                             | Description
----------------------------------|-----------------------------------------
`Ratio.ERROR_BAD_PARSE_ARGUMENTS` | Converting input to number returned `NaN`
`Ratio.ERROR_PARSE_OVERFLOW`      | During parsing we hit overflow limit, so numbers cannot be accurately represented

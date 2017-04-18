import { Ratio } from './src/Ratio'
import { suite, test, slow, timeout } from "mocha-typescript"
import { deepEqual, throws } from "assert"

@suite class RatioTestSute {
	@test("constructor without args returns ratio 0/1")
	ConstructorNoArgs() {
		deepEqual( new Ratio(), {_num: 0, _den: 1} )
	}
	
	@test("constructor with 1 arg returns ratio n/1")
	ConstructorOneArg() {
		deepEqual( new Ratio( 1 ), {_num: 1, _den: 1} )
		deepEqual( new Ratio( 2 ), {_num: 2, _den: 1} )
		deepEqual( new Ratio( 10 ), {_num: 10, _den: 1} )
		deepEqual( new Ratio( 20 ), {_num: 20, _den: 1} )
		deepEqual( new Ratio( 100 ), {_num: 100, _den: 1} )
	}

	@test("constructor with 2 args returns normalized ratio n/m")
	ConstructorTwoArgs() {
		deepEqual( new Ratio( 1, 1 ), {_num: 1, _den: 1} )
		deepEqual( new Ratio( 2, 3 ), {_num: 2, _den: 3} )
		deepEqual( new Ratio( 3, 6 ), {_num: 1, _den: 2} )
		deepEqual( new Ratio( 4, 100 ), {_num: 1, _den: 25} )
		deepEqual( new Ratio( 59, 151 ), {_num: 59, _den: 151} )
	}

	@test("constructor with non-integer args throws error")
	ConstructorNoIntegerArgs() {
		throws( () => { new Ratio( 5.6 ) } )
		throws( () => { new Ratio( 3.2, 4.5 ) } )
		throws( () => { new Ratio( 5.6, 4 ) } )
		throws( () => { new Ratio( 3, 5.6 ) } )
		throws( () => { new Ratio( 0, 5.1 ) } )
	}

	@test("constructor with second arg === 0 throws error")
	ConstructorZeroSecondArg() {
		throws( () => { new Ratio( 0, 0 ) } )
		throws( () => { new Ratio( 51, 0 ) } )
		throws( () => { new Ratio( 31, 0 ) } )
	}

	@test("constructor with NaN args throws error")
	ConstructorNaNArgs() {
		throws( () => { new Ratio( NaN ) } )
		throws( () => { new Ratio( 1, NaN ) } )
		throws( () => { new Ratio( NaN, NaN ) } )
	}

	@test("adding two ratios")
	Add() {
		deepEqual( new Ratio( 1, 2 ).add( new Ratio( 2, 3 )), new Ratio( 7, 6 ))
	}

	@test("subtracting two ratios")
	Subtract() {
		deepEqual( new Ratio( 1, 2 ).sub( new Ratio( 1, 3 )), new Ratio( 1, 6 ))
	}

	@test("multiplying two ratios")
	Multiply() {
		deepEqual( new Ratio( 3, 7 ).mul( new Ratio( 5, 9 )), new Ratio( 15, 63 ))
	}

	@test("dividing two ratios")
	Divide() {
		deepEqual( new Ratio( 9, 8 ).div( new Ratio( 6, 5 )), new Ratio( 45, 48 ))
	}

	@test("dividing by zero throws error")
	DivideByZero() {
		throws( () => { new Ratio( 5, 3 ).div( new Ratio( 0, 2 )) } )
	}

	@test("negation")
	Negation() {
		deepEqual( new Ratio( 12, 34 ).neg(), new Ratio( -12, 34 ) )
	}
}

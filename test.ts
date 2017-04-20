import "blanket"
import { Ratio } from './src/Ratio'
import { suite, test, slow, timeout } from "mocha-typescript"
import { assert, deepEqual, throws } from "assert"

const throwsMessage = ( f: () => void, errorMessage: string ) => {
	try {
		f()
		throw new Error()
	} catch ( {message} ) {
		deepEqual( errorMessage, message )
	}
}

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

	@test("constructor always puts sign in the numerator")
	SignInNumerator() {
		deepEqual( new Ratio( 1, -23 ), {_num: -1, _den: 23} )
		deepEqual( new Ratio( -2, -3 ), {_num: 2, _den: 3} )
		deepEqual( new Ratio( -1, 2 ), {_num: -1, _den: 2} )
	}

	@test("constructor with non-integer args throws error")
	ConstructorNoIntegerArgs() {
		throwsMessage( () => { new Ratio( 5.6 ) }, Ratio.ERROR_NUMERATOR_NOT_INTEGER )
		throwsMessage( () => { new Ratio( 3.2, 4.5 ) }, Ratio.ERROR_ARGUMENTS_NOT_INTEGER )
		throwsMessage( () => { new Ratio( 5.6, 4 ) }, Ratio.ERROR_NUMERATOR_NOT_INTEGER )
		throwsMessage( () => { new Ratio( 3, 5.6 ) }, Ratio.ERROR_DENOMINATOR_NOT_INTEGER )
		throwsMessage( () => { new Ratio( 0, 5.1 ) }, Ratio.ERROR_DENOMINATOR_NOT_INTEGER )
	}

	@test("constructor with second arg (denominatior) === 0 throws error")
	ConstructorZeroSecondArg() {
		throwsMessage( () => { new Ratio( 0, 0 ) }, Ratio.ERROR_DENOMINATOR_ZERO )
		throwsMessage( () => { new Ratio( 51, 0 ) }, Ratio.ERROR_DENOMINATOR_ZERO )
		throwsMessage( () => { new Ratio( 31, 0 ) }, Ratio.ERROR_DENOMINATOR_ZERO )
	}

	@test("constructor with NaN args throws error")
	ConstructorNaNArgs() {
		throwsMessage( () => { new Ratio( NaN ) }, Ratio.ERROR_NUMERATOR_NAN )
		throwsMessage( () => { new Ratio( 1, NaN ) }, Ratio.ERROR_DENOMINATOR_NAN )
		throws( () => { new Ratio( NaN, NaN ) }, Ratio.ERROR_ARGUMENTS_NAN )
	}

	@test("adding two ratios")
	Add() {
		deepEqual( new Ratio( 1, 2 ).add( new Ratio( 2, 3 )), new Ratio( 7, 6 ))
		deepEqual( new Ratio( 1, 2 ).add( new Ratio( 1, 2 )), new Ratio( 1 ))
	}

	@test("subtracting two ratios")
	Subtract() {
		deepEqual( new Ratio( 1, 2 ).sub( new Ratio( 1, 3 )), new Ratio( 1, 6 ))
		deepEqual( new Ratio( 1, 2 ).sub( new Ratio( 1, 2 )), new Ratio( 0 ))
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
		throwsMessage( () => new Ratio().div( new Ratio()), Ratio.ERROR_DIVISION_BY_ZERO )
		throwsMessage( () => { new Ratio( 7, 1 ).div( new Ratio( 0 )) }, Ratio.ERROR_DIVISION_BY_ZERO )
		throwsMessage( () => { new Ratio( 5, 3 ).div( new Ratio( 0, 2 )) }, Ratio.ERROR_DIVISION_BY_ZERO )
	}

	@test("negation")
	Negation() {
		deepEqual( new Ratio( 12, 34 ).neg(), new Ratio( -12, 34 ) )
	}

	@test("normalization")
	Normalization() {
		deepEqual( new Ratio( 1, 2 ), new Ratio( 23, 46 ))
		deepEqual( new Ratio( 5, 9 ), new Ratio( 25, 45 ))
		deepEqual( new Ratio( 5 ), new Ratio( 10000, 2000 ))
	}

	@test("equal")
	Equal() {
		deepEqual( new Ratio( 1, 2 ).eq( new Ratio( 4, 8 )), true )
		deepEqual( new Ratio( 1, 3 ).eq( new Ratio( 4, 8 )), false )
	}

	@test("not equal")
	NotEqual() {
		deepEqual( new Ratio( 3, 7 ).ne( new Ratio( 3, 8 )), true )
		deepEqual( new Ratio( 3, 8 ).ne( new Ratio( 3, 8 )), false )
	}

	@test("less or equal")
	LessOrEqual() {
		deepEqual( new Ratio( 3, 7 ).le( new Ratio( 6, 14 )), true )
		deepEqual( new Ratio( 3, 7 ).le( new Ratio( 4, 7 )), true )
		deepEqual( new Ratio( 3, 7 ).le( new Ratio( 2, 7 )), false )
	}

	@test("less")
	Less() {
		deepEqual( new Ratio( 3, 7 ).lt( new Ratio( 6, 14 )), false )
		deepEqual( new Ratio( 3, 7 ).lt( new Ratio( 4, 7 )), true )
		deepEqual( new Ratio( 3, 7 ).lt( new Ratio( 2, 7 )), false )
	}

	@test("greater")
	Greater() {
		deepEqual( new Ratio( 12, 24 ).gt( new Ratio( 6, 12 )), false )
		deepEqual( new Ratio( 2, 6 ).gt( new Ratio( 1, 5 )), true )
		deepEqual( new Ratio( 1, 6 ).gt( new Ratio( 2, 8 )), false )
	}
	
	@test("greater or equal")
	GreaterOrEqual() {
		deepEqual( new Ratio( 12, 24 ).ge( new Ratio( 6, 12 )), true )
		deepEqual( new Ratio( 2, 6 ).ge( new Ratio( 1, 5 )), true )
		deepEqual( new Ratio( 1, 6 ).ge( new Ratio( 2, 8 )), false )
	}

	@test("conversion to primitive value")
	ValueOf() {
		deepEqual( new Ratio( 5, 2 ).valueOf(), 2.5 )
		deepEqual( new Ratio( 2, 100 ).valueOf(), 0.02 )
		deepEqual( new Ratio( 1 ).valueOf(), 1 )
		deepEqual( new Ratio().valueOf(), 0 )
		deepEqual( new Ratio( 125, 25 ).valueOf(), 5 )
	}

	@test("comparsion with primitive values")
	ValueCompare() {
		deepEqual( (<any>new Ratio( 5, 2 )) == 2.5, true )
		deepEqual( (<any>new Ratio( 2, 100 )) == 0.02, true )
		deepEqual( (<any>new Ratio( 1 )) == 1, true )
		deepEqual( (<any>new Ratio()) == 0, true )
		deepEqual( (<any>new Ratio( 125, 25 )) == 5, true )
		const r: any = new Ratio( 5, 2 )
		deepEqual( r < 2.5, false )
		deepEqual( r <= 2.5, true )
		deepEqual( r < 3, true )
		deepEqual( r <= 3.5, true )
		deepEqual( r == 3.5, false )
		deepEqual( r == 2.5, true )
		deepEqual( r != 3.5, true )
		deepEqual( r > 2.5, false )
		deepEqual( r >= 2.5, true )
		deepEqual( r > 1, true )
		deepEqual( r >= 1, true )
		deepEqual( r >= 3.5, false )
	}

	@test("conversion to string")
	ConvertToString() {
		deepEqual( new Ratio().toString(), "Ratio (0)" )
		deepEqual( new Ratio(5).toString(), "Ratio (5)" )
		deepEqual( new Ratio(5,2).toString(), "Ratio (5/2)" )
		deepEqual( new Ratio(0,1411).toString(), "Ratio (0)" )
		deepEqual( new Ratio(5,25).toString(), "Ratio (1/5)" )
	}

	@test("numerator getter")
	NumeratorGetter() {
		deepEqual( new Ratio().num, 0 )
		deepEqual( new Ratio(1).num, 1 )
		deepEqual( new Ratio( 5, 10 ).num, 1 )
		deepEqual( new Ratio( 5, 2 ).num, 5 )
	}

	@test("denominator getter")
	DenominatorGetter() {
		deepEqual( new Ratio().den, 1 )
		deepEqual( new Ratio( 1 ).den, 1 )
		deepEqual( new Ratio( 5, 2 ).den, 2 )
		deepEqual( new Ratio( 123, 321 ).den, 107 )
	}

	@test("integral part getter")
	IntegralPartGetter() {
		deepEqual( new Ratio().int, new Ratio() )
		deepEqual( new Ratio( 5 ).int, new Ratio( 5 ))
		deepEqual( new Ratio( 5, 2 ).int, new Ratio( 2 ))
		deepEqual( new Ratio( -5, 2 ).int, new Ratio( -2 ))
		deepEqual( new Ratio( 1, 2 ).int, new Ratio( 0 ))
	}

	@test("fractional part getter")
	FractionalPartGetter() {
		deepEqual( new Ratio().frac, new Ratio())
		deepEqual( new Ratio( 1, 2 ).frac, new Ratio( 1, 2 ))
		deepEqual( new Ratio( 3, 2 ).frac, new Ratio( 1, 2 ))
		deepEqual( new Ratio( 5, 3 ).frac, new Ratio( 2, 3 ))
		deepEqual( new Ratio( -5, 3 ).frac, new Ratio( -2, 3 ))
	}

	@test("integral and fractional parts")
	IntegralAndFractionalParts() {
		const r = new Ratio( 5, 3 )
		deepEqual( r.int.add( r.frac ), r )
		const r2 = new Ratio( -5, 3 )
		deepEqual( r2.int.add( r2.frac ), r2 )
	}

	@test("parse numbers")
	ParseNumbers() {
		deepEqual( Ratio.parse( 11 ), new Ratio( 11 ))
		deepEqual( Ratio.parse( 102.1 ), new Ratio( 1021, 10 ))
		deepEqual( Ratio.parse( 2.52 ), new Ratio( 126, 50 ))
		deepEqual( Ratio.parse( 0.1 ), new Ratio( 1, 10 ))
		deepEqual( Ratio.parse( -13.12 ), new Ratio( -1312, 100 ))
		deepEqual( Ratio.parse( -0.2 ), new Ratio( 2, -10 ))
	}

	@test("parse strings")
	ParseStrings() {
		deepEqual( Ratio.parse( "11" ), new Ratio( 11 ))
		deepEqual( Ratio.parse( "102.1" ), new Ratio( 1021, 10 ))
		deepEqual( Ratio.parse( "2.52" ), new Ratio( 126, 50 ))
		deepEqual( Ratio.parse( "0.1" ), new Ratio( 1, 10 ))
		deepEqual( Ratio.parse( "+2.1" ), new Ratio( 21, 10 ))
		deepEqual( Ratio.parse( "-3.1" ), new Ratio( -31, 10 ))
	}

	@test("bad arguments to parse throws error")
	BadParse() {
		throwsMessage( () => Ratio.parse( NaN ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		throwsMessage( () => Ratio.parse( "" ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		throwsMessage( () => Ratio.parse( "zeawe" ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		let x: any
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		x = null
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		x = undefined
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		x = {}
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		x = []
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
		x = () => {}
		throwsMessage( () => Ratio.parse( x ), Ratio.ERROR_BAD_PARSE_ARGUMENTS )
	}

	@test("too large values causes parse to throw overflow error")
	ParseOverflow() {
		throwsMessage( () => Ratio.parse( Math.pow(2,60)), Ratio.ERROR_PARSE_OVERFLOW )
		throwsMessage( () => Ratio.parse( "100000000000000000000" ), Ratio.ERROR_PARSE_OVERFLOW )
		throwsMessage( () => Ratio.parse( 124123.12315123124321512 ), Ratio.ERROR_PARSE_OVERFLOW )
	}

	@test("custom overflow value")
	ParseCustomOverflow() {
		throwsMessage( () => Ratio.parse( "1000", 999 ), Ratio.ERROR_PARSE_OVERFLOW )
	}
}

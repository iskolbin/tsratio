function gcd( a: number, b: number ): number {
	while ( a !== b ) {
		if ( a > b ) {
			a -= b
		} else {
			b -= a
		}
	}
	return a
}

export class Ratio {
	static ERROR_NUMERATOR_NAN = 'Ratio numerator is NaN'
	static ERROR_DENOMINATOR_NAN = 'Ratio denominator is NaN'
	static ERROR_NUMERATOR_NOT_INTEGER = 'Ratio numerator is not an integer'
	static ERROR_DENOMINATOR_NOT_INTEGER = 'Ratio denominator is not an integer'
	static ERROR_DENOMINATOR_IS_ZERO = 'Ratio denominator is zero'
	static ERROR_DIVISION_BY_ZERO = 'Ratio divided by ratio with zero numerator'
	static ERROR_BAD_CONSTRUCTOR_ARGUMENTS = 'Bad arguments passed to parse method'

	readonly _num: number
	readonly _den: number

	constructor( num = 0, den = 1, noChecks: boolean = false ) {

		if ( !noChecks ) {
			if ( num !== num ) {
				throw new Error( Ratio.ERROR_NUMERATOR_NAN )
			} else if ( den !== den ) {
				throw new Error( Ratio.ERROR_DENOMINATOR_NAN )
			} else if ( Math.floor( num ) !== num ) {
				throw new Error( Ratio.ERROR_NUMERATOR_NOT_INTEGER )
			} else if ( Math.floor( den ) !== den ) {
				throw new Error( Ratio.ERROR_DENOMINATOR_NOT_INTEGER )
			} else if ( den === 0 ) {
				throw new Error( Ratio.ERROR_DENOMINATOR_IS_ZERO )
			}
		}

		if ( num === 0 ) {
			this._num = 0
			this._den = 1
		} else {
			const num_ = num > 0 ? num : -num
			const den_ = den > 0 ? den : -den
			const positive = (num > 0 && den > 0) || (num < 0 && den < 0)
			const n = gcd( num_, den_ )
			this._num = (positive ? num_ : -num_)/n
			this._den = den_/n
		}
	}

	add( {_num: num2, _den: den2}: Ratio ): Ratio {
		const {_num: num1, _den: den1} = this
		if ( den1 !== den2 ) {
			return new Ratio( num1*den2 + num2*den1, den1*den2, true )
		} else {
			return new Ratio( num2 + num2, den1, true )
		}
	}

	sub( {_num: num2, _den: den2}: Ratio ): Ratio {
		const {_num: num1, _den: den1} = this
		if ( den1 !== den2 ) {
			return new Ratio( num1*den2 - num2*den1, den1*den2, true )
		} else {
			return new Ratio( num2 - num2, den1, true )
		}
	}

	neg(): Ratio {
		return new Ratio( -this._num, this._den, true )
	}

	mul( {_num: num2, _den: den2}: Ratio ): Ratio {
		return new Ratio( this._num*num2, this._den*den2, true )
	}
	
	div( {_num: num2, _den: den2}: Ratio ): Ratio {
		if ( num2 === 0 ) {
			throw new Error( Ratio.ERROR_DIVISION_BY_ZERO )
		}	
		return new Ratio( this._num*den2, this._den*num2, true )
	}

	eq( {_num, _den}: Ratio ): boolean {
		return this._num === _num && this._den === _den
	}

	lt( {_num,_den}: Ratio ): boolean {
		if ( this._den === _den ) {
			return this._num < this._den
		} else {
			return this._num * _den < _num * this._den
		}
	}

	le( ratio: Ratio ): boolean {
		return this.eq( ratio ) || this.lt( ratio )
	}

	ne( ratio: Ratio ): boolean {
		return !this.eq( ratio )
	}

	gt( ratio: Ratio ): boolean {
		return !this.lt( ratio ) && !this.eq( ratio ) 
	}

	ge( ratio: Ratio ): boolean {
		return !this.lt( ratio )
	}

	toInteger(): number {
		return this._num < 0 ? Math.ceil( this._num/this._den ) : Math.floor( this._num/this._den )
	}

	toNumber(): number {
		return this._num / this._den
	}

	toString(): string {
		if ( this._num === 0 ) {
			return 'Ratio (0)'
		} else if ( this._den === 1 ) {
			return `Ratio (${this._num.toString()})`
		} else {
			return `Ratio (${this._num.toString() + '/' + this._den.toString()})`
		}
	}

	valueOf(): number {
		return this.toNumber()
	}

	get num(): number {
		return this._num
	}

	get den(): number {
		return this._den
	}

	get int(): Ratio {
		return new Ratio( this.toInteger(), 1, true )
	}

	get frac(): Ratio {
		return this.sub( new Ratio( this.toInteger(), 1, true ))
	} 
	
	static parse( s: number|string ): Ratio {
		const n = typeof s === 'string' ? parseFloat( s ) : s	
		if ( n !== n ) {
			throw new Error( Ratio.ERROR_BAD_CONSTRUCTOR_ARGUMENTS )
		} else if ( Math.floor( n ) === n ) {
			return new Ratio( n, 1, true )
		} else {
			const positive = n > 0
			const n_ = positive ? n : -n
			let num1 = n_
			let den2 = 1/n_
			let den1 = 1
			while (Math.floor(num1) !== num1 && Math.floor(den2) !== den2) {
				num1 *= 10
				den2 *= 10
				den1 *= 10
			}
			if ( Math.floor(num1) == num1 ) {
				return new Ratio( positive ? num1 : -num1, den1, true )
			} else {
				return new Ratio( positive ? den1 : -den1, den2, true )
			}
		}
	}
}

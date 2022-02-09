/* 6 kyu
Base Conversion

In this kata you have to implement a base converter, which converts positive integers between arbitrary bases / alphabets. Here are some pre-defined alphabets:

var Alphabet = {
  BINARY:        '01',
  OCTAL:         '01234567',
  DECIMAL:       '0123456789',
  HEXA_DECIMAL:  '0123456789abcdef',
  ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
  ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};
The function convert() should take an input (string), the source alphabet (string) and the target alphabet (string). You can assume that the input value always consists of characters from the source alphabet. You don't need to validate it.

Examples
// convert between numeral systems
convert("15", Alphabet.DECIMAL, Alphabet.BINARY); // should return "1111"
convert("15", Alphabet.DECIMAL, Alphabet.OCTAL); // should return "17"
convert("1010", Alphabet.BINARY, Alphabet.DECIMAL); // should return "10"
convert("1010", Alphabet.BINARY, Alphabet.HEXA_DECIMAL); // should return "a"

// other bases
convert("0", Alphabet.DECIMAL, Alphabet.ALPHA); // should return "a"
convert("27", Alphabet.DECIMAL, Alphabet.ALPHA_LOWER); // should return "bb"
convert("hello", Alphabet.ALPHA_LOWER, Alphabet.HEXA_DECIMAL); // should return "320048"
convert("SAME", Alphabet.ALPHA_UPPER, Alphabet.ALPHA_UPPER); // should return "SAME"
Additional Notes:

The maximum input value can always be encoded in a number without loss of precision in JavaScript. In Haskell, intermediate results will probably be too large for Int.
The function must work for any arbitrary alphabets, not only the pre-defined ones
You don't have to consider negative numbers */


function convert(input, source, target) {
  
  //length of source and target
  let sourceLength = source.length;
  let targetLength = target.length;

  let int = 0;

  // if src - decimal - convert to decimal, else every digit of value  mult by powered source length 
  if(source === Alphabet.DECIMAL) {
    int = parseInt(input, 10);
  } else {
    for(let i = input.length - 1; i >= 0; i -= 1) {
      const el = input[i];
      const powOf = Math.pow(sourceLength, input.length - 1 - i);

      let value = source.indexOf(el);
      int += value * powOf;
    }
  }

  let dec = [int];
  // compare every el of decimal with targerLength
  const isValidTargetLengthNumber = (arr) => arr.every(x => x < targetLength);

  while(!isValidTargetLengthNumber(dec)) {
    const newDec = [];

    for(let i = 0; i < dec.length; i += 1) {
      const curr = dec[i]

      if(curr < targetLength) {
        newDec.push(curr);
      } else {
        const powOf = Math.floor(curr / targetLength);
        const remainder = curr % targetLength;
        newDec.push(powOf);
        newDec.push(remainder);
      }
    }

    dec = newDec;
  }

  return dec.map(i => target[parseInt(i, 10)]).join('');
}
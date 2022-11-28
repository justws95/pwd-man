const CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARACTERS = '!@#$%^&*-=+_';


const setIncludedCharset = (opts) => {
  let include = '';

  if (opts.includes('Capital Letters')) {
    include += CAPITALS;
  }

  if (opts.includes('Lowercase Letters')) {
    include += LOWERCASE;
  }

  if (opts.includes('Numbers')) {
    include += NUMBERS;
  }

  if (opts.includes('Special Characters')) {
    include += SPECIAL_CHARACTERS
  }

  return include;
}


const setPasswordLengthFromRange = (range) => {
  // Ensure ordering of range elements and split
  range = range.sort();
  const min = range[0];
  const max = range[1];

  return Math.floor(Math.random() * (max - min) + min);
}


export const generateRandomString = (charsetOpts, range) => {
  const charset = setIncludedCharset(charsetOpts);
  const pwdLength = setPasswordLengthFromRange(range);

  let randString = '';

  for (let i = 0; i < pwdLength; i++ ) {
    randString += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return randString;
}

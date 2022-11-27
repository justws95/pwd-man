const CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARACTERS = '!@#$%^&*-=+_';

export const generateRandomString = (length) => {
  const charset = CAPITALS + LOWERCASE + NUMBERS + SPECIAL_CHARACTERS;
  let randString = '';

  for (let i = 0; i < length; i++ ) {
    randString += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return randString;
}

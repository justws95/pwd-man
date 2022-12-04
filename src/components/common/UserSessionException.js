export class UserSessionException extends Error {
  constructor(errMsg) {
    super(`${errMsg}`);
  }
}

export class UserSecretNotFoundException extends Error {
  constructor(errMsg) {
    super(`${errMsg}`);
  }
}
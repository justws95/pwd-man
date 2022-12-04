export default class UserSessionException extends Error {
  constructor(errMsg) {
    super(`${errMsg}`);
  }
}

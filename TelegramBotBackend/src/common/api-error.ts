export class ApiError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'API Error';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
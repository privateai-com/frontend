export class ApiError extends Error {
  status = 0;

  error = '';

  constructor(message: string, status: number, error: string) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

export class CustomError extends Error {
  readonly statusCode: number;
  readonly status: string;
  readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message || 'Bad request');

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.isOperational = true;
  }
}

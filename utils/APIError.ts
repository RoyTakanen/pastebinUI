export class APIError extends Error {
  status: number;
  title: string;

  constructor(status: number, message?: string, title?: string) {
    super(message || 'Jotakin meni pieleen :(');
    this.name = 'APIError';
    this.title = title || 'Virhe';
    this.status = status;
  }
}

export interface apiRequestError {
  error: { text: string };
  name: string;
  message: string;
  status: number;
  url: string;
}

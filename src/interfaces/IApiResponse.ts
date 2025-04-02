export interface IApiResponse<T> {
  data: T | null;
  status: number;
  message: string;
}

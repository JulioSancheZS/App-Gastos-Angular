export interface IResponse<T> {
  status: boolean;
  msg?: string;
  value: T;
  token: string;
}

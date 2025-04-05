export type IResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export type IMessageResponse = IResponse<null>;

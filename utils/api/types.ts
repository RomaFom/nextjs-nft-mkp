interface BaseResponse {
  status: number;
  error?: {
    message: string;
  };
  data?: any;
}

export interface IUserResponse extends BaseResponse {
  data?: {
    token: string;
  };
}

export interface IUserDataResponse extends BaseResponse {
  data?: {
    id: number;
    username: string;
  };
}

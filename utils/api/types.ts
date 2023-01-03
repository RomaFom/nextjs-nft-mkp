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
        user: {
            id: number;
            username: string;
            wallet: string;
        };
    };
}

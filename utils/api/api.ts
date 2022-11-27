import axios, { AxiosError, AxiosResponse } from 'axios';

import { ILoginForm } from '@/components/Forms/LoginForm/types';
import { IFormSignUp } from '@/components/Forms/SignUpForm/types';

import { IUserDataResponse, IUserResponse } from './types';

const instance = axios.create({
    baseURL: process.env.CORE_API,
    timeout: 15000,
});

interface Response {
    status: number;
    data: any;
}

const responseBody = (response: AxiosResponse): Response => ({
    status: response.status,
    data: response.data,
});

interface ResponseError {
    status: number;
    message: string;
}
const errorBody = (error: AxiosError<ResponseError>) => ({
    status: error.response?.status || 500,
    error: {
        message: error.response?.data.message || 'Unknown error on api client',
    },
});

const requests = {
    get: (url: string, Authorization?: string) =>
        instance
            .get(url, {
                headers: {
                    Authorization: Authorization,
                },
            })
            .then(responseBody)
            .catch(errorBody),
    post: (url: string, body: any) =>
        instance.post(url, body).then(responseBody).catch(errorBody),
    // put: (url: string, body: any) => instance.put(url, body).then(responseBody),
    // delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Transaction = {
    // addNew: (tx: ISendTx): Promise<number> =>
    //   requests.post("transaction/add", tx),
    // getPosts: (): Promise<PostType[]> => requests.get('posts'),
    // getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
    // createPost: (post: PostType): Promise<PostType> =>
    //     requests.post('posts', post),
    // updatePost: (post: PostType, id: number): Promise<PostType> =>
    //     requests.put(`posts/${id}`, post),
    // deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

export const ApiAuth = {
    signUp: (user: IFormSignUp): Promise<IUserResponse> =>
        requests.post('/auth/registration', user),
    login: (user: ILoginForm): Promise<IUserResponse> =>
        requests.post('/auth/login', user),
    getUserData: (token: string): Promise<IUserDataResponse> =>
        requests.get('/auth/get-user', `Bearer ${token}`),
};

export const MkpApi = {
    // getCount: (): Promise<IItemCountResponse> =>
    //   requests.get('/marketplace/item-count'),
    // getItems: (): Promise<IItemResponse> => requests.get('/marketplace/get-all'),
};

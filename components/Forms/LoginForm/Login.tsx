import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosResponse } from 'axios';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { ILoginForm, loginSchema } from '@/components/Forms/LoginForm/types';
import InputWrapper from '@/components/InputWrapper';
import { useUser } from '@/providers/UserProvider/UserContext';

const Login: React.FC = () => {
    const [cookie, setCookie] = useCookies(['tokenData']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = useCallback(
        async (values: ILoginForm): Promise<void> => {
            try {
                setIsSubmitting(true);
                const {
                    data: { data },
                }: AxiosResponse = await axios.post('/api/auth/login', values);

                setCookie('tokenData', data.token, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                });
                router.push('/');
            } catch (err) {
                console.log('error', err);
            } finally {
                setIsSubmitting(false);
            }
        },
        [router, setCookie],
    );

    if (user) {
        return null;
    }

    return (
        <form className="pt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-auto xs:w-10/12 md:w-1/2 lg:w-1/3 gap-y-3.5">
                <InputWrapper labelId={'username'} labelText={'Username'}>
                    <input
                        autoComplete={'off'}
                        className={cn(errors.username && 'invalid')}
                        {...register('username')}
                    />
                </InputWrapper>
                <InputWrapper labelId={'password'} labelText={'Password'}>
                    <input
                        autoComplete={'off'}
                        className={cn(errors.password && 'invalid')}
                        type={'password'}
                        {...register('password')}
                    />
                </InputWrapper>
                <span className="flex justify-center pt-2nex">
                    <Button
                        disabled={isSubmitting}
                        showLoader={isSubmitting}
                        type="submit"
                    >
                        Login
                    </Button>
                </span>
            </div>
        </form>
    );
};
export default Login;

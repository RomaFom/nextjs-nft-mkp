import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosResponse } from 'axios';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button/Button';
import {
    IFormInputValues,
    signUpSchema,
} from '@/components/Forms/SignUpForm/types';
import InputWrapper from '@/components/InputWrapper';

const SignUp: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookie, setCookie] = useCookies(['tokenData']);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputValues>({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit = useCallback(
        async (values: IFormInputValues): Promise<void> => {
            try {
                setIsSubmitting(true);
                const {
                    data: { data },
                }: AxiosResponse = await axios.post(
                    '/api/auth/sign-up',
                    values,
                );

                setCookie('tokenData', data.token, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                });
                router.push('/');
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsSubmitting(false);
            }
        },
        [router, setCookie],
    );

    return (
        <>
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

                    <InputWrapper
                        labelId={'confirmPassword'}
                        labelText={'Confirm'}
                    >
                        <input
                            autoComplete={'off'}
                            className={cn(errors.confirmPassword && 'invalid')}
                            type={'password'}
                            {...register('confirmPassword')}
                        />
                    </InputWrapper>

                    <span className="flex justify-center pt-2nex">
                        <Button
                            disabled={isSubmitting}
                            showLoader={isSubmitting}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </span>
                </div>
            </form>
        </>
    );
};
export default SignUp;

'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import Button from '@/app/components/Button/Button';
import {
    IFormInputValues,
    signUpSchema,
} from '@/app/components/Forms/SignUpForm/types';
import InputWrapper from '@/app/components/InputWrapper';
import { useUser } from '@/app/providers/UserProvider/UserContext';
import { IUserResponse } from '@/utils/api/types';
import { basicError } from '@/utils/notifications/notificationsCenter';

const SignUp: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookie, setCookie] = useCookies(['tokenData']);
    const router = useRouter();
    const { user, setUser } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputValues>({
        resolver: yupResolver(signUpSchema),
    });

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const onSubmit = async (values: IFormInputValues): Promise<void> => {
        try {
            setIsSubmitting(true);
            const res: IUserResponse = await (
                await fetch('/api/auth/sign-up', {
                    method: 'POST',
                    body: JSON.stringify(values),
                })
            ).json();
            if (res.status >= 400) {
                basicError(res.error?.message || 'Something went wrong');
                return;
            }
            setCookie('tokenData', res.data?.token, {
                path: '/',
                maxAge: 3600,
                sameSite: true,
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (user) {
        return null;
    }

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
                        <Button disabled={isSubmitting} type="submit">
                            Sign Up
                        </Button>
                    </span>
                </div>
            </form>
        </>
    );
};
export default SignUp;

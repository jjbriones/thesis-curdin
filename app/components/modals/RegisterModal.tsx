'use client';

import axios from 'axios';
import {FaFacebook, FaGoogle} from 'react-icons/fa6';
import React, {useCallback, useEffect, useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import {signIn} from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';
import TermsCondModal from "@/app/components/modals/TermsCondModal";

const ContentRegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [showTermsModal, setShowTermsModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        value: 0,
        color: 'bg-red-600 dark:bg-red-300',
    });

    useEffect(() => {
        let strengthValue = 0;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);

        if (password.length > 8) strengthValue += 20;
        if (password.length > 15) strengthValue += 15;
        if (hasUpperCase) strengthValue += 20;
        if (hasLowerCase) strengthValue += 20;
        if (hasNumbers) strengthValue += 20;
        if (hasNonalphas) strengthValue += 20;

        let color = 'bg-red-600 dark:bg-red-300';
        if (strengthValue >= 100) color = 'bg-blue-600 dark:bg-blue-300';
        else if (strengthValue >= 75) color = 'bg-green-600 dark:bg-green-300';
        else if (strengthValue >= 50) color = 'bg-yellow-500 dark:bg-yellow-300';
        else if (strengthValue >= 25) color = 'bg-orange-500 dark:bg-orange-300';

        strengthValue = Math.min(strengthValue, 100);
        setPasswordStrength({value: strengthValue, color: color});
    }, [password]);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {name: '', email: '', password: ''},
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        axios.post('/api/register', data)
            .then(() => registerModal.close())
            .catch((error) => toast.error("Couldn't register user"))
            .finally(() => setLoading(false));
    };

    const toggle = useCallback(() => {
        registerModal.close();
        loginModal.open();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="text-start">
                <div className="text-2xl font-bold">Welcome to Curdin!</div>
            </div>
            <Input
                id="name"
                label="Name"
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={loading}
                register={register}
                errors={errors}
                onInput={(event) => setPassword(event.target.value)}
                required
            />
            <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    Password Strength
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div className={'transition-colors ease-out h-2.5 rounded-full ' + passwordStrength.color}
                         style={{width: passwordStrength.value + '%'}}
                    />
                </div>
            </div>
            <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                disabled={loading}
                onInput={(event) => setConfirmPassword(event.target.value)}
                errors={errors}
                required
            />
            {!password || !confirmPassword || password !== confirmPassword && (
                <div className="text-red-500 text-sm font-medium">
                    Passwords do not match
                </div>
            )}

            <div className="flex items-center my-3">
                <input onChange={() => setAgree(!agree)}
                       id="agree-checkbox"
                       type="checkbox"
                       value=""
                       className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="agree-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    I agree with the <a href="#" onClick={() => setShowTermsModal(true)} className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.
                </label>
            </div>

        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FaGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Facebook"
                icon={FaFacebook}
                onClick={() => { }}
            />

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Already have an account?</div>
                    <div
                        onClick={toggle}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                toggle();
                            }
                        }}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Modal
                disabled={
                    loading ||
                    (!password || !confirmPassword || password !== confirmPassword) ||
                    !agree
                }
                isOpen={registerModal.isOpen}
                actionLabel="Continue"
                onSubmit={handleSubmit(onSubmit)}
                onClose={registerModal.close}
                body={bodyContent}
                title={'Sign Up'}
                footer={footerContent}
                secondaryAction={registerModal.close}
                secondaryActionLabel={'Cancel'}
            />
            <TermsCondModal open={showTermsModal} setOpen={setShowTermsModal}/>
        </>
    );
};

export default ContentRegisterModal;

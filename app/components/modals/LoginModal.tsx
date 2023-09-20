'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { FaFacebook, FaGoogle } from 'react-icons/fa6';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const ContentLoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((res) => {
      setLoading(false);

      if (res?.ok) {
        toast.success('Logged in successfully!');
        router.refresh();
        loginModal.close();
      }

      if (res?.error) {
        toast.error(res.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-start">
        <div className="text-2xl font-bold">Welcome to Curdin!</div>
      </div>

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
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FaGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Facebook"
        icon={FaFacebook}
        onClick={() => {}}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.close}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.close}
      body={bodyContent}
      title={'Log In'}
      footer={footerContent}
    />
  );
};

export default ContentLoginModal;

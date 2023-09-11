'use client';

import axios from 'axios';
import { FaFacebook, FaGoogle } from 'react-icons/fa6';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const ContentRegisterModal = () => {
  const registerModal = useRegisterModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.close();
      })
      .catch((error) => {
        toast.error("Couldn't register user");
      })
      .finally(() => {
        setLoading(false);
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
        id="name"
        label="Name"
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
      isOpen={registerModal.isOpen}
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.close}
      body={bodyContent}
      title={'Sign Up'}
      footer={footerContent}
    />
  );
};

export default ContentRegisterModal;

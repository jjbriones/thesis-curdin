'use client';

import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import {FaPesoSign} from 'react-icons/fa6';
import React from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors,
    onInput,
}) => {
    const forFormatPrice = formatPrice ? 'pl-9' : 'pl-4';
    const forErrors = (errors && errors[id]) ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-orange-400';

    return (
        <div className="w-full relative">
            {formatPrice && (
                <FaPesoSign
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                type={type}
                disabled={disabled}
                onInput={onInput}
                className={`peer w-full font-light bg-white p-4 pt-6 border-2 rounded-md focus:pt-6 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-base ${forFormatPrice} ${forErrors}`}
                placeholder=""
                {...register ? register(id, {required}) : {}}
            />
            <label className={`absolute text-md -translate-y-4 duration-150 transform top-5 z-10 origin[0] scale-75 text-base
                            peer-focus:text-orange-400 peer-focus:text-sm text-neutral-400
                            ${formatPrice ? 'left-9' : 'left-3'}
                            ${!(errors) || errors[id] ? 'text-orange-400' : 'text-zinc-400'}`
            }>
                {label}
            </label>
        </div>
    );
};

export default Input;

'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
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
}) => {
  const forFormatPrice = formatPrice ? 'pl-9' : 'pl-4';
  const forErrors = errors[id]
    ? 'border-red-500 focus:border-orange-400'
    : 'border-neutral-300 focus:border-orange-400';

  /*

<label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin[0] scale-75
        peer-placeholder-shown:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
        peer-focus:-translate-y-4 peer-focus:text-orange-400 peer-focus:text-sm text-neutral-400
        ${formatPrice ? 'left-9' : 'left-3'}
        s${errors[id] ? 'text-orange-400' : 'text-zinc-400'}`}
      >
      
      */

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        className={`peer w-full font-light bg-white p-4 pt-6 bg-white border-2 rounded-md focus:pt-6
        outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-base
        ${forFormatPrice} 
        ${forErrors}`}
        placeholder=""
        {...register(id, { required })}
      />
      <label
        className={`absolute text-md -translate-y-4 duration-150 transform top-5 z-10 origin[0] scale-75 text-base
        peer-focus:text-orange-400 peer-focus:text-sm text-neutral-400
        ${formatPrice ? 'left-9' : 'left-3'}
        ${errors[id] ? 'text-orange-400' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

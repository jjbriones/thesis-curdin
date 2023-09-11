'use-client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  const outlineDesign = outline
    ? 'bg-white border-gray-500 text-black'
    : 'bg-orange-400 border-orange-300 text-white';

  const size = small
    ? 'py-1 text-sm font-light border-[1px]'
    : 'py-3 text-md font-semibold border-2';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition 
      ${outlineDesign}
      ${size}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;

'use client';

import { KeyboardEvent, useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onSubtract = useCallback(() => {
    if (value === 0) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">Number of {title}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onSubtract}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onSubtract();
            }
          }}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onAdd();
            }
          }}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;

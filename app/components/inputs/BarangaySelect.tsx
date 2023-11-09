'use client';

import useBarangay from '@/app/hooks/useBarangay';
import Select from 'react-select';

export type BarangaySelectValue = {
  label: string;
  value: string;
};

interface BarangaySelectProps {
  value: BarangaySelectValue;
  onChange: (value: BarangaySelectValue) => void;
}

const BarangaySelect: React.FC<BarangaySelectProps> = ({ value, onChange }) => {
  const { getAll } = useBarangay();

  return (
    <div>
      <h1>Barangay</h1>
      <Select
        placeholder="Barangay"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as BarangaySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe3e6',
          },
        })}
      />
    </div>
  );
};

export default BarangaySelect;

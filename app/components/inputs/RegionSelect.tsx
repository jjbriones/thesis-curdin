'use client';

import useRegions from '@/app/hooks/useRegions';
import Select from 'react-select';

export type RegionSelectValue = {
  label: string;
  value: string;
};

interface RegionSelectProps {
  value: RegionSelectValue;
  onChange: (value: RegionSelectValue) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ value, onChange }) => {
  const { getAllRegions } = useRegions();

  return (
    <div>
      <h1>Region</h1>
      <Select
        placeholder="Region"
        isClearable
        options={getAllRegions()}
        value={value}
        onChange={(value) => onChange(value as RegionSelectValue)}
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

export default RegionSelect;

'use client';

import useCountries from '@/app/hooks/useCountries';
import phil from 'phil-reg-prov-mun-brgy';
import Select from 'react-select';
import React from "react";

interface CountrySelectProps {
    value: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

export type CountrySelectValue = {
    flag: string;
    label: string;
    value: string;
    latlng: number[];
    region: string;
};

interface CountrySelectProps {
    value: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountryOption = (option: any) => (
    <div className="flex flex-row items-center gap-3">
        <div>{option.flag}</div>
        <div>
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
        </div>
    </div>
);

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();

    return (
        <div>
            <h1>Country</h1>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={CountryOption}
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

export default CountrySelect;

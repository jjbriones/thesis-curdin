'use client';

import useCities from '@/app/hooks/useCities';
import Select from 'react-select';

export type CitySelectValue = {
	label: string;
	value: string;
};

interface CitySelectProps {
	value: CitySelectValue | undefined;
	onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
	const { getAll } = useCities();

	return (
		<div>
			<h1>City</h1>
			<Select
				placeholder="City"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as CitySelectValue)}
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

export default CitySelect;

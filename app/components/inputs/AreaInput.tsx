'use client';

interface AreaProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const AreaInput: React.FC<AreaProps> = ({ title, value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);

    onChange(inputValue);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="font-medium">Property {title}</div>
      <div className="flex justify-around items-center">
        <div>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="flex items-center justify-center w-20 "
          />
        </div>
      </div>
    </div>
  );
};

export default AreaInput;

import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
  className?: string; // Optional for additional styling
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ id, label, checked, onChange, className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxComponent;

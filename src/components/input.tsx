import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseInputProps {
  label: string;
  error?: string;
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  type?: 'text' | 'email' | 'password' | 'number';
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  type: 'select';
  options: Array<{ value: string; label: string }>;
}

type InputProps = TextInputProps | SelectInputProps;

const Input: React.FC<InputProps> = (props) => {
  const { label, error } = props;

  const baseClassName = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClassName = error ? "border-red-500" : "border-gray-300";

  if (props.type === 'select') {
    const { options, ...selectProps } = props;
    return (
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          className={`${baseClassName} ${errorClassName} bg-white`}
          {...selectProps}
        >
          <option value="">Tanlang...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`${baseClassName} ${errorClassName}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;


import React from 'react'

interface CheckboxProps {
	type: 'radio' | 'checkbox' | 'text'
	label?: string
	value?: string
	checked?: boolean
	onChange?: (value: string) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
	type,
	label,
	value,
	checked = false,
	onChange = () => {},
}) => {
	const id = label && `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`

	return (
		<label
			htmlFor={id}
			className={`w-full border text-lg text-gray-800 p-4 rounded-lg flex items-center ${
				checked ? 'border-blue-500 bg-blue-100' : 'border-[#44556A]'
			}`}
		>
			<input
				id={id}
				type={type}
				name='answer'
				className='form-radio text-blue-600 w-6 h-6 mr-4'
				value={value}
				checked={checked}
				onChange={() => value && onChange(value)}
			/>
			{label}
		</label>
	)
}

export default Checkbox

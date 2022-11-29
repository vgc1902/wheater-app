import { FormLabel, RequiredIndicator, Select } from "@vechaiui/react";

export const SelectUI = ({
	label,
	options,
	handleChange,
	defaultOption = "",
	isRequired = false,
	isDisabled = false,
}) => (
	<div className="py-5">
		<FormLabel>
			{label} {isRequired && <RequiredIndicator />}
		</FormLabel>
		<Select
			aria-label={label}
			defaultValue={defaultOption}
			onChange={handleChange}
			disabled={isDisabled}
		>
			{defaultOption && (
				<option value={defaultOption} disabled>
					...
				</option>
			)}
			{options.map(({ name, code }) => (
				<option key={code} value={code}>
					{name}
				</option>
			))}
		</Select>
	</div>
);

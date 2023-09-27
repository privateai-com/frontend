export type RadioButtonOption<T> = {
  value: T;
  label: string;
};

export type RadioButtonProps<T> = {
  options: RadioButtonOption<T>[];
  labelClassName?: string;
  onChange: (value: T) => void;
  currentValue?: T;
  disabled?: boolean;
  containerClassName?: string;
  radioButtonClassName?: string;
};

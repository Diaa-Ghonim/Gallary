import { useState, FormEvent } from 'react';

type Result = {
  value: string;
  onChange: (evt: FormEvent<HTMLInputElement>) => void;
};

export function useFormInput(): Result {
  let [value, setValue] = useState('');

  return {
    value,
    onChange(evt) {
      setValue(evt.currentTarget.value);
    },
  };
}

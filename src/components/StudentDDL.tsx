import React, { useState } from 'react';
import { DropDown, IDropDownOption } from './DropDown/DropDown';
import { DropDownItem } from './DropDown/DropDownItem';

export const StudentDDL: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [newNameOptionValue, setNewNameOptionValue] = useState<string>('');
  const [newNameOptionValue2, setNewNameOptionValue2] = useState<string>('');

  const handleChange = (value: string) => {
    const valueIndex: number = selectedOptions.findIndex((x) => x === value);
    if (valueIndex === -1) {
      setSelectedOptions([...selectedOptions, value]);
      return;
    }
    const newSelectedOption: string[] = [...selectedOptions];
    newSelectedOption.splice(valueIndex, 1);
    setSelectedOptions(newSelectedOption);
  };

  const isSelected = (option: IDropDownOption): boolean => {
    return option.customInput && option.customInput.value !== '' ? true : selectedOptions.findIndex((x) => x === option.value) !== -1;
  };

  const options: IDropDownOption[] = [
    { text: 'Student 1', value: '1' },
    { text: 'Student 2', value: '2' },
    { text: 'Student 3', value: '3' },
    { text: 'Student 4', value: '4' },
    { text: 'Student 5', value: '5' },
    {
      text: 'New Student',
      value: '6',
      customInput: {
        value: newNameOptionValue,
        onChange: setNewNameOptionValue,
      },
      selectedText: (option: IDropDownOption) => {
        return `${option.text}: ${newNameOptionValue}`;
      },
    },
    {
        text: 'New Student 2',
        value: '7',
        customInput: {
          value: newNameOptionValue2,
          onChange: setNewNameOptionValue2,
        },
        selectedText: (option: IDropDownOption) => {
          return `${option.text}: ${newNameOptionValue2}`;
        },
      },
  ];

  return (
    <DropDown
      submit={() => {
        console.log('ddl submitted data');
        const submitValue = {
          selectedOptions: { ...selectedOptions },
          customInput: options.filter((x) => x.customInput).map((x) => ({ valueId: x.value, text: x.customInput?.value })),
        };

        console.log(submitValue);
        alert('DDL submitted and logged');
      }}
      isOpened={openDropDown}
      selected={selectedOptions}
      placeholder={'No preferences'}
      toggle={setOpenDropDown}
      label="Student"
      options={options}
      items={
        <div>
          {options.map((option) => (
            <DropDownItem
              selected={isSelected(option)}
              handleClick={() => handleChange(option.value)}
              customInput={option.customInput}
              key={option.value}
            >
              {option.text}
            </DropDownItem>
          ))}
        </div>
      }
    />
  );
};

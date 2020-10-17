import React, { useState } from 'react';
import { DropDown, IDropDownOption } from './DropDown/DropDown';
import { DropDownItem } from './DropDown/DropDownItem';

export const LanguageDDL: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherOptionValue, setOtherOptionValue] = useState<string>('');

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
    { text: 'English', value: '1' },
    { text: 'Mandarin', value: '2' },
    { text: 'Hokkien', value: '3' },
    { text: 'Tamil', value: '4' },
    { text: 'Cantonese', value: '5' },
    {
      text: 'Others',
      value: '6',
      customInput: {
        value: otherOptionValue,
        onChange: setOtherOptionValue,
      },
      selectedText: (option: IDropDownOption) => {
        return `${option.text}: ${otherOptionValue}`;
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
      label="Language"
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

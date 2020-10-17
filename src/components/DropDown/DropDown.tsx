import React, { useRef, useEffect, useState } from 'react';
import '../../styles/DropDown.css';
import useOutsideClick from '../../utils/UseOutsideClick';
import { DropDownBody } from './DropDownBody';

interface Props {
  isOpened: boolean;
  toggle(open: boolean): void;
  selected: string[];
  placeholder: string;
  items: JSX.Element;
  options: IDropDownOption[];
  label?: string;
  submit(): void;
}

export const DropDown: React.FC<Props> = ({ isOpened = false, toggle, selected, items, label, placeholder, options, submit }) => {
  const wrapperRef: any = useRef();

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (selected.length > 0 && !isDirty) setIsDirty(true);
  }, [selected]);

  const toggleAndValidate = (open: boolean, isSubmit: boolean = false) => {
    toggle(open);
    if (isSubmit) {
      setIsDirty(true);
      if (selected.length === 0) setIsValid(false);
      else setIsValid(true);
      return;
    }
    if (selected.length === 0 && isDirty) setIsValid(false);
    else setIsValid(true);
  };

  useOutsideClick(wrapperRef, () => isOpened && (isDirty ? toggleAndValidate(false) : toggle(false)));

  const handleSelectedText = (): string => {
    if (selected.length > 0)
      return selected
        .map((selectedID: string) => {
          const selectedOption = options.find((y) => y.value === selectedID);
          if (!selectedOption) return '';
          return selectedOption.selectedText ? selectedOption.selectedText(selectedOption) : selectedOption.text;
        })
        .join(',');
    return placeholder ? placeholder : 'No items selected';
  };

  return (
    <div ref={wrapperRef} className="custom-dropdown-wrapper">
      {label && <label className="cdw-label">{label}</label>}
      <button className="cdw-trigger" onClick={() => toggleAndValidate(!isOpened)}>
        <span className="cdw-trigger-text">{handleSelectedText()}</span>
        <span className={`cdw-trigger-icon ${isOpened && 'open'}`}>
          <i className="chevron"></i>
        </span>
      </button>
      {isOpened && (
        <DropDownBody>
          <div className="cdw-scroll-body">{items}</div>
          <button
            type="button"
            className="cdw-save-btn"
            onClick={() => {
              toggleAndValidate(false, true);
              submit();
            }}
          >
            SAVE
          </button>
        </DropDownBody>
      )}
      {!isValid && <label>This field is required</label>}
    </div>
  );
};

export type IDropDownOption = {
  text: string;
  value: any;
  selectedText?: Function;
  customInput?: IDropDownOptionCustomInput;
};

export type IDropDownOptionCustomInput = {
  value: string;
  onChange(inputValue: string): void;
};

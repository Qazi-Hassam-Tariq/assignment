import React from 'react';
import '../../styles/DropDown.css';
import { CustomCheckMark } from '../../utils/CustomCheckMark';
import { IDropDownOptionCustomInput } from './DropDown';

interface Props {
  children?: any;
  handleClick(): void;
  selected: boolean;
  customInput?: IDropDownOptionCustomInput;
}

export const DropDownItem: React.FC<Props> = ({ children, handleClick, selected, customInput }) => {
  return (
    <div
      onClick={() => {
        if (selected && customInput) customInput.onChange('');
        handleClick();
      }}
      className="cdw-option"
    >
      <div className="cdw-option-text-wrapper">
        <span className="cdw-option-text">{children}</span>
        {selected && (
          <span className="cdw-option-icon">
            <CustomCheckMark color="white" background="#2dbfce" />
          </span>
        )}
      </div>
      {
        <div className="cdw-custom-input" style={{ display: selected && customInput ? 'block' : 'none' }}>
          <input
            type="text"
            value={customInput?.value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={ (selected && customInput?.value === '') ? 'invalid' : '' } 
            onChange={(e) => customInput?.onChange(e.currentTarget.value)}
          />
        </div>
      }
    </div>
  );
};

import React, { useRef } from 'react';
import '../styles/CustomCheckMark.css';

interface Props {
  color: string;
  background: string;
}

export const CustomCheckMark: React.FC<Props> = ({ color, background }) => {
  return (
    <span className="custom-checkmark">
      <div className="checkmark_circle" style={{backgroundColor: background}}></div>
      <div className="checkmark_stem" style={{backgroundColor: color}}></div>
      <div className="checkmark_kick" style={{backgroundColor: color}}></div>
    </span>
  );
};

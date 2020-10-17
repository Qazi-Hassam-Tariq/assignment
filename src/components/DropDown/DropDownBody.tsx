import React, { useRef, useEffect, useState } from 'react';
import '../../styles/DropDown.css';

interface Props {
  children?: any;
}
export const DropDownBody: React.FC<Props> = ({ children }) => {
  const bodyRef: any = useRef();

  const [positionBottom, setPositionBottom] = useState<boolean>(true);

  useEffect(() => {
    if (bodyRef && bodyRef.current) {
      const viewPort = isOutOfViewport(bodyRef.current);
      setPositionBottom(!viewPort.bottom);
    }
  }, []);

  return (
    <div
      ref={bodyRef}
      className="cdw-body"
      style={{
        top: positionBottom ? 'calc(100% + 10px)' : 'auto',
        bottom: !positionBottom ? '70px' : 'auto',
      }}
    >
      {children}
    </div>
  );
};

var isOutOfViewport = function (elem: any) {
  const bounding = elem.getBoundingClientRect();

  const out: any = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;
};

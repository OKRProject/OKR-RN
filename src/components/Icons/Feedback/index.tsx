import React from 'react';
import {Svg, Rect, Path} from 'react-native-svg';

const Feedback = ({color}: {color: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.0021 7H19.5011C19.225 7 19.0011 7.22386 19.0011 7.5V15.5C19.0011 15.7761 18.7772 16 18.5011 16H8.5C8.22386 16 8 16.2239 8 16.5V18C8 18.552 8.45 19 9.001 19H15.0001L17.0006 21L18.1476 22.1467C18.4626 22.4616 19.0011 22.2385 19.0011 21.7931L19.0011 19H21.0011C21.5533 19 22.001 18.5523 22.001 18L22.0011 8C22.0011 7.447 21.5531 7 21.0021 7Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2.99903L3.99997 2.99902C3.44797 2.99902 3.99998 3.44702 3.99998 4.00002V16.7929C3.99998 17.2384 4.53855 17.4615 4.85353 17.1465L8 14H16C16.551 14 16.999 13.552 16.999 12.999V4.00003C16.999 3.44703 16.551 2.99903 16 2.99903Z"
        fill={color ?? 'currentColor'}
      />
      <Rect x="1" y="3" width="6" height="11" rx="1" fill={color} />
    </Svg>
  );
};

export default Feedback;

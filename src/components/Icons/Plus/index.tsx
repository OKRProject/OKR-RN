import React from 'react';
import {Path, Svg} from 'react-native-svg';

const Plus = ({color = 'white'}: {color?: string}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 26 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.0001 11.1429H14.8573V3.05176e-05H11.143V11.1429H0.000106812V14.8572H11.143V26H14.8573V14.8572H26.0001V11.1429Z"
        fill={color}
      />
    </Svg>
  );
};

export default Plus;

import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const AddPerson = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1224_11005)">
        <Path
          d="M13 8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8C5 10.21 6.79 12 9 12C11.21 12 13 10.21 13 8ZM15 10V12H18V15H20V12H23V10H20V7H18V10H15ZM1 18V20H17V18C17 15.34 11.67 14 9 14C6.33 14 1 15.34 1 18Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1224_11005">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AddPerson;

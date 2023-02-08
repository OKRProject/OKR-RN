import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  color?: string;
};
const Check = ({color}: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_749_6493)">
        <Path
          d="M15.88 8.28957L9.99998 14.1696L8.11998 12.2896C7.72998 11.8996 7.09998 11.8996 6.70998 12.2896C6.31998 12.6796 6.31998 13.3096 6.70998 13.6996L9.29998 16.2896C9.68998 16.6796 10.32 16.6796 10.71 16.2896L17.3 9.69957C17.69 9.30957 17.69 8.67957 17.3 8.28957C16.91 7.89957 16.27 7.89957 15.88 8.28957Z"
          fill={color ? color : 'currentColor'}
        />
      </G>
      {/*   <Defs>
        <clipPath id="clip0_749_6493">
          <Rect width="24" height="24" fill="white" />
        </clipPath>
      </Defs> */}
    </Svg>
  );
};

export default Check;

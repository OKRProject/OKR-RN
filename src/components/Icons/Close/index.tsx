import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color: string;
};
const Close = ({color}: Props) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
        fill={color}
      />
    </Svg>
  );
};

export default Close;

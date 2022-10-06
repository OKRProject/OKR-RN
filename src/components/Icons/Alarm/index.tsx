import React from 'react';
import {Path, Svg} from 'react-native-svg';

const Alarm = ({color}: {color: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5268 15.2132C19.2655 15.2132 19.0537 15.0014 19.0537 14.74V10.33C19.0537 8.38593 18.3115 6.52153 16.9905 5.14689C15.6696 3.77226 13.8779 3 12.0098 3C11.0852 3 10.1697 3.18966 9.31565 3.55815C8.46159 3.92664 7.68572 4.46673 7.03241 5.14751C6.3791 5.82829 5.86117 6.6364 5.50825 7.52565C5.15532 8.41491 4.97433 9.36786 4.97561 10.33V14.7254C4.97561 14.9948 4.75721 15.2132 4.4878 15.2132C4.2184 15.2132 4 15.4316 4 15.701V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V15.6864C20 15.4251 19.7882 15.2132 19.5268 15.2132Z"
        fill={color}
      />
      <Path
        d="M8 20C8.5061 20.6298 9.12345 21.1331 9.81236 21.4776C10.5013 21.8221 11.2465 22 12 22C12.7535 22 13.4987 21.8221 14.1876 21.4776C14.8765 21.1331 15.4939 20.6298 16 20H8Z"
        fill={color}
      />
    </Svg>
  );
};

export default Alarm;
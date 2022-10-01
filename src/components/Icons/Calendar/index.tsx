import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Calendar = ({color}: {color: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8882 8.6019C16.6495 9.18126 16.2997 9.70769 15.8588 10.1511C15.4178 10.5946 14.8942 10.9464 14.318 11.1864C13.7418 11.4264 13.1242 11.55 12.5005 11.5501C11.2408 11.5502 10.0327 11.0472 9.14193 10.1518C8.25113 9.25643 7.75061 8.04193 7.75048 6.77552C7.75042 6.14845 7.87321 5.52751 8.11183 4.94815C8.35046 4.3688 8.70025 3.84237 9.14124 3.39892C10.0319 2.50334 11.2399 2.00013 12.4995 2C13.7592 1.99987 14.9673 2.50283 15.8581 3.39823C16.7489 4.29363 17.2494 5.50812 17.2495 6.77454C17.2496 7.40161 17.1268 8.02254 16.8882 8.6019ZM3 19.4228C3 21.4576 8.66352 22 12.5 22C16.3365 22 22 21.4576 22 19.4228C22 17.3869 19.3395 13.0109 12.5 13.0109C5.6605 13.0109 3 17.3869 3 19.4228Z"
        fill={color}
      />
    </Svg>
  );
};

export default Calendar;

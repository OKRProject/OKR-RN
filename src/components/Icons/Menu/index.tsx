import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';

const Menu = () => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_599_2126"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="white" />
      </Mask>
      <G mask="url(#mask0_599_2126)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.118 6.19999C20.4362 6.19999 20.7415 6.07356 20.9665 5.84852C21.1915 5.62347 21.318 5.31825 21.318 4.99999C21.318 4.68173 21.1915 4.3765 20.9665 4.15146C20.7415 3.92642 20.4362 3.79999 20.118 3.79999H4.11797C3.79971 3.79999 3.49448 3.92642 3.26944 4.15146C3.0444 4.3765 2.91797 4.68173 2.91797 4.99999C2.91797 5.31825 3.0444 5.62347 3.26944 5.84852C3.49448 6.07356 3.79971 6.19999 4.11797 6.19999H20.118ZM4.11797 10.8C3.79971 10.8 3.49448 10.9264 3.26944 11.1515C3.0444 11.3765 2.91797 11.6817 2.91797 12C2.91797 12.3182 3.0444 12.6235 3.26944 12.8485C3.49448 13.0736 3.79971 13.2 4.11797 13.2H20.118C20.4362 13.2 20.7415 13.0736 20.9665 12.8485C21.1915 12.6235 21.318 12.3182 21.318 12C21.318 11.6817 21.1915 11.3765 20.9665 11.1515C20.7415 10.9264 20.4362 10.8 20.118 10.8H4.11797ZM4.11797 17.8C3.96038 17.8 3.80434 17.831 3.65875 17.8913C3.51316 17.9516 3.38087 18.04 3.26944 18.1515C3.15801 18.2629 3.06962 18.3952 3.00931 18.5408C2.94901 18.6864 2.91797 18.8424 2.91797 19C2.91797 19.1576 2.94901 19.3136 3.00931 19.4592C3.06962 19.6048 3.15801 19.7371 3.26944 19.8485C3.38087 19.9599 3.51316 20.0483 3.65875 20.1086C3.80434 20.169 3.96038 20.2 4.11797 20.2H20.118C20.2756 20.2 20.4316 20.169 20.5772 20.1086C20.7228 20.0483 20.8551 19.9599 20.9665 19.8485C21.0779 19.7371 21.1663 19.6048 21.2266 19.4592C21.2869 19.3136 21.318 19.1576 21.318 19C21.318 18.8424 21.2869 18.6864 21.2266 18.5408C21.1663 18.3952 21.0779 18.2629 20.9665 18.1515C20.8551 18.04 20.7228 17.9516 20.5772 17.8913C20.4316 17.831 20.2756 17.8 20.118 17.8H4.11797Z"
          fill="white"
        />
      </G>
    </Svg>
  );
};

export default Menu;

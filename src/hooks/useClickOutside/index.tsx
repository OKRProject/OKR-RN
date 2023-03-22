import {RefObject, useEffect} from 'react';

const useClickOutside = (ref: RefObject<any>, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && e.target && !ref.current.contains(e.target))
        onClickOutside();
    };
    // window.addEventListener('mousedown', handleClickOutside);
    // return () => {
    //   ref.current.removeEventListener('mousedown', handleClickOutside);
    // };
  }, [onClickOutside, ref]);
};

export default useClickOutside;

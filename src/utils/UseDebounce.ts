import { useEffect, useState } from "react";

export const UseDebounce = (initialValue: string | number, delay: number) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let timer:any;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(initialValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [initialValue]);
  return value;
};

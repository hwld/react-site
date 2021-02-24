import { useState } from 'react';

export const useOpener = (init: boolean) => {
  const [isOpen, setIsOpen] = useState(init);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(state => !state);
  };

  return { isOpen, open, close, toggle };
};

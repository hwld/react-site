import { useState } from 'react';

export const useDialog = (init: boolean) => {
  const [isOpen, setIsOpen] = useState(init);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close };
};

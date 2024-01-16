import { useRef, useState } from 'react';

const initialVal = {
  visible: false,
  y: 0,
  x: 0,
};

export const useContextMenu = () => {
  const [contextData, setContextData] = useState(initialVal);
  const contextMenuRef = useRef<HTMLLIElement>(null);

  const showMenu = (e: MouseEvent) => {
    e.preventDefault();

    const contextMenuAttributes =
      contextMenuRef.current?.getBoundingClientRect();
    const isLeftScreen = e.clientX < window.innerWidth / 2;

    let x: number;
    const y = e.clientY;

    if (isLeftScreen) {
      x = e.clientX;
    } else {
      x = e.clientX - contextMenuAttributes?.width;
    }

    setContextData({
      visible: true,
      x,
      y,
    });
  };

  return { contextData, showMenu, contextMenuRef };
};

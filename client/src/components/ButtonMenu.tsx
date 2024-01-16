import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

import { useClickOutside } from '../hooks/useClickOutside';

type BtnMenuContextType = {
  closeMenu: () => void;
  openMenu: (menuId: string) => void;
  changePosition: ({ x, y }: { x: number; y: number }) => void;
  setPosition: ({ x, y }: { x: number; y: number }) => void;
  isOpen: string;
  position: {
    x: number;
    y: number;
  };
};

const BtnMenuContext = createContext<BtnMenuContextType | null>(null);

const BtnMenu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState('');
  const [position, setPosition] = useState({ y: 0, x: 0 });

  const closeMenu = () => setIsOpen('');
  const openMenu = (menuId: string) => setIsOpen(menuId);
  const changePosition = ({ x, y }: { x: number; y: number }) =>
    setPosition({ x, y });

  return (
    <BtnMenuContext.Provider
      value={{
        isOpen,
        position,
        closeMenu,
        openMenu,
        changePosition,
        setPosition,
      }}
    >
      {children}
    </BtnMenuContext.Provider>
  );
};

const Toggle = ({ menuId }: { menuId: string }) => {
  const { isOpen, closeMenu, openMenu, setPosition } =
    useContext(BtnMenuContext)!;

  const handleOpenMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    menuId === '' || isOpen !== menuId ? openMenu(menuId) : closeMenu();
  };

  return (
    <button
      onClick={handleOpenMenu}
      className='text-text-light-1 dark:text-text-dark-1'
    >
      <HiOutlineEllipsisHorizontal size={24} />
    </button>
  );
};

const Menu = ({
  menuId,
  children,
}: {
  menuId: string;
  children: ReactNode;
}) => {
  const { isOpen, position, closeMenu } = useContext(BtnMenuContext)!;
  const { clickRef } = useClickOutside(closeMenu);

  return createPortal(
    <AnimatePresence>
      {menuId === isOpen ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          ref={clickRef}
          style={{ right: `${position.x}px`, top: `${position.y}px` }}
          className='fixed z-[1000] bg-bg-light-2 dark:bg-bg-dark-1 border border-border-light dark:border-border-dark p-2 rounded-lg shadow-sm'
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

const Button = ({
  children,
  onClick,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactElement;
}) => {
  const { closeMenu } = useContext(BtnMenuContext)!;

  const handleClick = e => {
    e.stopPropagation();
    onClick?.();
    closeMenu();
  };

  return (
    <li
      onClick={handleClick}
      className='py-1 px-2 text-text-light-1 dark:text-text-dark-1 md:hover:bg-bg-light-hover-2 md:hover:rounded-md cursor-pointer'
    >
      <button className='flex items-center gap-2'>
        <span>{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  );
};

BtnMenu.Menu = Menu;
BtnMenu.Toggle = Toggle;
BtnMenu.Button = Button;

export default BtnMenu;

import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

type ModalType = {
  isOpen: string;
  open: (windowName: string) => void;
  close: () => void;
};

type WindowType = {
  children: ReactElement;
  windowId: string;
  title?: string;
};

const ModalContext = createContext<ModalType | null>(null);

const Modal = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState('');

  const open = (windowName: string) => setIsOpen(windowName);
  const close = () => setIsOpen('');

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, windowId }: WindowType) => {
  const context = useContext(ModalContext);

  if (!context) throw new Error('Can not use context outside provider');

  return cloneElement(children, {
    onClick: () => context.open(windowId),
  });
};

const Window = ({ children, windowId, title }: WindowType) => {
  const context = useContext(ModalContext);

  if (!context) throw new Error('Can not use context outside provider');

  return createPortal(
    <AnimatePresence>
      {context.isOpen === windowId ? (
        <>
          <motion.div
            initial={{ y: '-40%', x: '-50%', opacity: 0, scale: 0.9 }}
            animate={{ y: '-40%', x: '-50%', opacity: 1, scale: 1 }}
            exit={{ x: '-50%', opacity: 0, scale: 0.9 }}
            className='bg-bg-light-1 text-text-light-1 dark:bg-bg-dark-1 dark:text-text-dark-1 fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%] w-[50vw] min-w-[325px] max-w-[600px] p-3 pb-0 rounded-md min-h-[100px] max-h-[550px] lg:max-h-[650px] z-[110] border border-border-light dark:border-border-dark shadow-md'
          >
            <header className='flex justify-between items-center'>
              <h4 className='font-semibold text-text-light-1 dark:text-text-dark-1'>
                {title}
              </h4>
              <button
                aria-label='close modal'
                className='text-text-light-1 dark:text-text-dark-1 md:text-text-light-2 md:hover:text-text-light-1 dark:md:text-text-dark-2 dark:md:hover:text-text-dark-1 hover:rotate-90 transition-all'
                onClick={context.close}
              >
                <HiOutlineXMark size={22} />
              </button>
            </header>
            <section className='my-4'>
              {cloneElement(children, { onClose: context.close })}
            </section>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={context.close}
            className='fixed top-0 left-0 h-full w-full z-[100] bg-[#706e6e1e] backdrop-blur-[1.5px] cursor-pointer'
          ></motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

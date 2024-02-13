import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { HiOutlineXMark } from 'react-icons/hi2';

import { cn } from '../utils/shadcnUtils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[100] bg-[#706e6e1e] backdrop-blur-[1.5px]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    removeCloseBtn?: boolean;
    title?: string;
  }
>(({ className, children, removeCloseBtn, title, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      onOpenAutoFocus={e => e.preventDefault()}
      ref={ref}
      className={cn(
        `fixed left-[50%] top-[50%] z-[110] w-[50vw] min-w-[325px] max-w-[550px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-light bg-bg-light-2 dark:border-border-dark dark:bg-bg-dark-2 px-3 py-3 ${
          removeCloseBtn ? 'pt-3' : 'pt-10'
        } shadow-sm rounded-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]`,
        className
      )}
      {...props}
    >
      <header className='flex justify-between items-center'>
        {title ? (
          <h4
            className={`font-semibold text-text-light-1 dark:text-text-dark-1 mb-2 ${
              removeCloseBtn ? 'text-xl' : 'text-base'
            }`}
          >
            {title}
          </h4>
        ) : null}
        {!removeCloseBtn ? (
          <button
            aria-label='close modal'
            className='text-text-light-1 dark:text-text-dark-1 md:text-text-light-2 md:hover:text-text-light-1 dark:md:text-text-dark-2 dark:md:hover:text-text-dark-1 transition-all'
          >
            <HiOutlineXMark size={22} />
          </button>
        ) : null}
      </header>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
};

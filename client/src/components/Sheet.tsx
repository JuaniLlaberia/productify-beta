import * as SheetPrimitive from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import type {
  ElementRef,
  ComponentPropsWithoutRef,
  HTMLAttributes,
} from 'react';

import { cn } from '../utils/shadcnUtils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-[#706e6e1e] backdrop-blur-[1.5px] cursor-pointer data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {}

const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, title, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      onOpenAutoFocus={e => e.preventDefault()}
      ref={ref}
      className={cn(
        'overflow-y-auto fixed z-[100] gap-4 bg-bg-light-2 dark:bg-bg-dark-2 border-border-light dark:border-border-dark shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-full md:w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
        className
      )}
      {...props}
    >
      <header
        className={`sticky top-0 flex ${
          title ? 'p-5 justify-between' : 'p-2 justify-end'
        } items-center bg-bg-light-2 dark:bg-bg-dark-2`}
      >
        {title ? (
          <h2 className='flex-grow text-center font-semibold text-text-light-1 dark:text-text-dark-1'>
            {title}
          </h2>
        ) : null}
        <SheetPrimitive.Close className='rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 text-text-light-1 dark:text-text-dark-1'>
          <HiOutlineXMark size={18} />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </header>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetFooter,
};

import { ReactElement, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi2';

import { useClickOutside } from '../hooks/useClickOutside';

type OptionType = {
  label: string;
  value: string | number | boolean;
};

type SelectType = {
  options: OptionType[];
  selectedOption: OptionType;
  onChange: (option: OptionType) => void;
  removeBorders?: boolean;
  placeholder?: string;
  icon?: ReactElement;
};

const SelectSingle = ({
  options,
  onChange,
  selectedOption,
  removeBorders,
  placeholder,
  icon,
}: SelectType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clickRef } = useClickOutside(() => setIsOpen(false));

  const selectOption = (option: OptionType) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ${removeBorders ? 'mt-0' : 'mt-3'} cursor-pointer`}
      ref={clickRef}
    >
      <div
        className={`relative w-full ${
          removeBorders
            ? 'border-none'
            : 'border border-border-light dark:border-border-dark'
        } py-2 lg:py-2.5 rounded-lg flex justify-between items-center ${
          isOpen && !removeBorders ? 'border-special-color' : ''
        }`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {icon && (
          <span className='absolute text-xl 2xl:text-2xl text-text-light-2'>
            {icon}
          </span>
        )}
        <h1
          className={`flex items-center h-full px-2 line-clamp-1 text-text-light-1 dark:text-text-dark-1 ${
            icon ? 'pl-7' : ''
          }`}
        >
          {!selectedOption ? (
            <span className='text-text-light-2 dark:text-text-dark-2'>
              {placeholder ? placeholder : 'Select option'}
            </span>
          ) : (
            <span>{selectedOption.label}</span>
          )}
        </h1>
        <div className='flex items-center h-full px-4 text-text-light-1 dark:text-text-dark-1'>
          <HiOutlineChevronDown
            className={`${
              isOpen ? 'rotate-180' : ''
            } transition-all  duration-300`}
          />
        </div>
      </div>
      <ul
        className={`w-full h-0 bottom-0 left-0 z-[100] absolute max-h-36 top-[100%] ${
          isOpen
            ? 'h-36 border border-border-light dark:border-border-dark'
            : ''
        } overflow-y-scroll overflow-x-hidden transition-all duration-300 rounded-lg mt-1 shadow-sm z-40 bg-bg-light-2 dark:bg-dark-bg-1 lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover`}
      >
        {options.map(option => (
          <li
            key={option.label}
            onClick={() => selectOption(option)}
            className={`px-3 py-2.5 lg:py-3 text-text-light-1 dark:text-text-dark-1 active:bg-bg-light-1 active:dark:bg-bg-dark-2 last:border-none border-b border-border-light dark:border-border-dark flex items-center gap-3 ${
              selectedOption.value === option.value
                ? 'bg-bg-light-1 dark:bg-bg-dark-1'
                : ''
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectSingle;

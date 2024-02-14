import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { HiOutlineFaceSmile } from 'react-icons/hi2';

import { useClickOutside } from '../hooks/useClickOutside';

const EmojiMenu = ({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clickRef } = useClickOutside(() => setIsOpen(false));

  const handleEmojiPick = (emoji: { native: string }) => {
    setValue(prev => prev + emoji.native);
  };

  return (
    <div className='relative flex'>
      {isOpen ? (
        <div
          ref={clickRef}
          className='absolute top-[-1500%]'
        >
          <Picker
            onEmojiSelect={handleEmojiPick}
            searchPosition='none'
            previewPosition='none'
            maxFrequentRows='1'
            data={data}
            lazyLoad={true}
            theme='dark'
            set='native'
          />
        </div>
      ) : null}
      <button
        className='text-text-light-2 dark:text-text-dark-2'
        onClick={() => setIsOpen(true)}
      >
        <p className='sr-only'>Emoji</p>
        <HiOutlineFaceSmile size={28} />
      </button>
    </div>
  );
};

export default EmojiMenu;

import {
  LuBold,
  LuHeading1,
  LuList,
  LuItalic,
  LuType,
  LuAlignVerticalJustifyCenter,
} from 'react-icons/lu';
import { memo } from 'react';
import type { Editor } from '@tiptap/react';

import TiptapToolItem from './TiptapToolItem';

const TiptapToolBar = ({ editor }: { editor: Editor }) => {
  return (
    <ul className='w-full flex justify-center  items-center gap-1 mt-4 mb-2'>
      <TiptapToolItem
        icon={<LuHeading1 />}
        method={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor?.isActive('heading', { level: 1 })}
      />
      <TiptapToolItem
        icon={<LuType />}
        method={() => editor?.chain().focus().setParagraph().run()}
        isActive={editor?.isActive('paragraph')}
      />
      <TiptapToolItem
        icon={<LuBold />}
        method={() => editor?.chain().focus().toggleBold().run()}
        isActive={editor?.isActive('bold')}
      />
      <TiptapToolItem
        icon={<LuItalic />}
        method={() => editor?.chain().focus().toggleItalic().run()}
        isActive={editor?.isActive('italic')}
      />
      <TiptapToolItem
        icon={<LuList />}
        method={() => editor?.chain().focus().toggleBulletList().run()}
        isActive={editor?.isActive('bulletList')}
      />
      <TiptapToolItem
        icon={<LuAlignVerticalJustifyCenter />}
        method={() => editor?.chain().focus().setHardBreak().run()}
      />
    </ul>
  );
};

export default memo(TiptapToolBar);

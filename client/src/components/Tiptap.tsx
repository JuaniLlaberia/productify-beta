import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';

import TiptapToolBar from './TiptapToolBar';

type TiptapType = {
  content: string;
  handleContent?: (content: string) => void;
  isReadOnly?: boolean;
};

//REMEMBER DATA SANITIZATION BECAUSE OF THE HTML

const Tiptap = ({ handleContent, content, isReadOnly }: TiptapType) => {
  //Tiptap configuration
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({ emptyEditorClass: 'placeholder-tiptap' }),
    ],
    content,
    editable: !isReadOnly,
    editorProps: {
      attributes: {
        class: `${
          isReadOnly
            ? 'line-clamp-[6]'
            : 'h-[350px] lg:h-[450px] overflow-y-scroll'
        } my-2 outline-none border-none md:scrollbar-thin md:scrollbar-thumb-scroll-light hover:md:scrollbar-thumb-scroll-light-hover [&>h1]:text-lg lg:[&>h1]:text-2xl [&>h1]:font-semibold [&>p]:text-base lg:[&>p]:text-lg [&>ul]:pl-6 lg:[&>ul]:pl-10 [&>ul]:list-disc text-text-light-1 dark:text-text-dark-1`,
      },
    },
    onBlur({ editor }) {
      if (handleContent) handleContent(editor.getHTML());
    },
  });

  //Update content on real time when tiptap (readonly) re-renders
  if (isReadOnly) {
    editor?.commands.setContent(content);
  }

  return (
    <>
      <EditorContent
        editor={editor}
        id='text-editor'
      />
      {!isReadOnly ? <TiptapToolBar editor={editor!} /> : null}
    </>
  );
};

export default Tiptap;

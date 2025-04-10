'use client'; // Required for client-side interactivity

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Heading.configure({
        levels: [1, 2],
      }),
    ],
    content: `
      <h1>Rich *</h1>
      <h2>➔ Heading</h2>
      <p><strong>@6@8a8 amf0on @Ue9@1eIg9@1a9@9amUo m0@2a0 6m3@3 a5@2j0e 8@g6m @0a0a0@8 6mj8aamqk@tg</strong></p>
      <p><strong>@!(06@0a0 @(0j4e0)Qj4! @'0d3@2g9@0a (0j4a1u)(0(0 6p)(m9e8 6p@7a0@9a0a 6u)T1a0@9a0a 8 6omuQi</strong></p>
      <p><strong>@U((08 6n1a0)q @'0mUa.m0 Uo@9omUo 6omU0@mUaG0a1a 6n1a0@9a0a 6o 6n1a0@8a0a 6p)mUaT0U0U0</strong></p>
      <p><strong>63L1a0@2q9e1a 6m1b1@U0 O8@0r 5a9a16e a(j)2a1a1a0 U0/2r8qj 6e1l9m1a0 9qm9e19m2a1</strong></p>
      <p><strong>a(j)mU5(g9 6n00m1a8b10 6p01a15 6nm0U0U0 60a2b62l8b11c3 6@'0d36m @9e6m@U0U0 6mj3a0(f)no</strong></p>
      <p><strong>6a(j)gmmu0 6m0c6a6b10 U0@(0 aj3a12b6)@(0 2qj4a1"8a1aJ0@?2af0oo.db.</strong></p>
    `,
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded ${
            editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded ${
            editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          H2
        </button>
      </div>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <EditorContent 
          editor={editor} 
          className="min-h-[300px] border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
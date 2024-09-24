import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type QuillEditorProps = {
    value: string;
    onChange: (value: any) => void;
};

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="Start typing here..."
    />
  );
};

export default QuillEditor;

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorWrapper = React.memo(({ name, data, onChange, label, error }) => {
  return (
    <div className="col-span-5">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <CKEditor
          name={name}
          editor={ClassicEditor}
          data={data}
          onChange={(event, editor) => onChange(editor.getData())}
         
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
});

export default CKEditorWrapper;
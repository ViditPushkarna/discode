import React from 'react';

function TextBox(props) {
  return (
    <div>
      <style></style>
      <textarea id="code-editor" name="coder" rows="20" cols="150">
        printf("hello world");
      </textarea>
    </div>
  );
}

export default TextBox;

import React from 'react';
import TextBox from './TextBox';
import OutputBox from './OutputBox';

function Editor(props) {
  return (
    <>
      <div>Hey this is the editor</div>
      <div>
        Choose the Language :
        <select>
          <option value="C++">Fruit</option>
          <option value="PYTHON">Vegetable</option>
          <option value="JAVA">Meat</option>
        </select>
      </div>
      <br></br>
      <TextBox />
      <br />
      <OutputBox />
    </>
  );
}

export default Editor;

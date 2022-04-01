import React from 'react';

function OutputBox(props) {
  return (
    <div>
      <textarea
        id="output-box"
        name="coder"
        rows="5"
        cols="80"
        placeholder="OUTPUT"
        value={'Your mother name is Rakhi'}
      ></textarea>
    </div>
  );
}

export default OutputBox;

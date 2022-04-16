import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor() {
  const wrapperRef = useRef();
  useEffect(() => {
    console.log(document);
    // const editor = document.getElementById("container");
    // wrapperRef.current.append(editor);
    // new Quill(editor, { theme: "snow" });
    // //

    // return () => {
    //   wrapperRef.current.innerHTML = "";
    // };
  }, []);
  return <div id="container" ref={wrapperRef}></div>;
}

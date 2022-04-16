import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function IndexPage() {
  const [lang, setlang] = useState('javascript')
  const [mount, setMounted] = useState(false)
  const monacoRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;
    setMounted(true)
  }

  useEffect(() => {
    if (!mount) return

    const socket = io("http://localhost:5000/");
    socket.emit("joinEditor");

    socket.on('editorChanges', data => {
      monacoRef.current.getModel().setValue(data)
    })

    document.addEventListener('keyup', e => {
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Tab' || e.key === 'Delete') {
        const val = monacoRef.current.getValue()
        socket.emit('editorChangesSend', val)
      }
    })

    document.getElementById('selectlang').addEventListener('change', e => {
      setlang(e.target.value)
      socket.emit('changeLangSend', e.target.value)
    })

    socket.on('changeLang', data => {
      console.log(data)
      setlang(data)
    })

    return () => {
      socket.disconnect();
    };
  }, [mount])

  return (
    <>
      <select id="selectlang" value={lang}>
        <option value="html">html</option>
        <option value="css">css</option>
        <option value="javascript">javascript</option>
        <option value="json">json</option>
      </select>
      <MonacoEditor
        height="90vh"
        language={lang}
        defaultValue="// code goes here"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </>
  );
}
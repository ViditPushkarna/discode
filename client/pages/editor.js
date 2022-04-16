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

    monacoRef.current.getModel().onDidChangeContent(e => {
      const val = monacoRef.current.getValue()
      socket.emit('editorSendChanges', val)
    })

    return () => {
      socket.disconnect();
    };
  }, [mount])

  return (
    <>
      <select value={lang} onChange={e => setlang(e.target.value)}>
        <option>html</option>
        <option>css</option>
        <option>javascript</option>
        <option>json</option>
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
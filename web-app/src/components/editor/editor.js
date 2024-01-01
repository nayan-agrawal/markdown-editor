import React from 'react'
import Editor from "@monaco-editor/react";

const MarkdownEditor = (props) => {
    const { height = "100%", defaultLanguage = "markdown", defaultValue = "// Write something", handleEditorChange = {} } = props;

    return (
        <Editor
            height={height}
            defaultLanguage={defaultLanguage}
            defaultValue={defaultValue}
            onChange={handleEditorChange}
        />
    )
}
export default MarkdownEditor;
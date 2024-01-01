import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MarkdownEditor from './editor/editor';
import 'github-markdown-css/github-markdown.css'

export default function LiveMarkdown() {
    const [markdownInput, setMarkdownInput] = useState();
    const [convertedMarkdown, setConvertedMarkdown] = useState('');

    useEffect(() => {
        (async () => {
            if (markdownInput?.length === 0) return;
            try {
                const response = await axios.post('http://localhost:5000/convert', { data: markdownInput });
                setConvertedMarkdown(response.data.result);
            } catch (error) {
                console.error('Error converting Markdown:', error);
            }
        })();
    }, [markdownInput]);

    return (
        <div className="App">
            <div className="wrapper">
                <MarkdownEditor
                    value={markdownInput}
                    handleEditorChange={(value, e) => setMarkdownInput(value)}
                />
            </div>
            <div className="wrapper">
                <div className='markdown-body' dangerouslySetInnerHTML={{ __html: convertedMarkdown }} />
            </div>
        </div>
    )
}
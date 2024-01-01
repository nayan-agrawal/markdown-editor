import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';

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
                <div className="head">
                    <VisibilityIcon />
                    MARKDOWN
                </div>
                <textarea
                    autoFocus
                    className="textarea"
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                ></textarea>
            </div>
            <div className="wrapper">
                <div className="head">
                    <VisibilityIcon />
                    PREIVEW
                </div>
                <div dangerouslySetInnerHTML={{ __html: convertedMarkdown }} />
            </div>
        </div>
    )
}

const MarkComponent = ({ value, language }) => {
    return (
        <SyntaxHighlighter language={language ?? null} style={docco}>
            {value ?? ''}
        </SyntaxHighlighter>
    )
}
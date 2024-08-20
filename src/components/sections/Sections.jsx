import Image from "next/image";
import React, { useState } from "react";
const { default: Icon } = require("@/icons");

const Text = ({ content }) => <p>{content}</p>

const CodeLine = ({ content }) => {
    if (content === "") {
        return <Breakline />
    } else {
        return <Text content={content} />
    }
}

const Link = ({ content, url }) => {
    return <a href={url} target="_blank" className="articleLink">{content}</a>;
}

const Heading = ({ level, text }) => {
    const HeadingTag = `h${level}`;
    return <HeadingTag>{text}</HeadingTag>;
}

const Breakline = () => <br />

const Media = ({ fileType, altText, filePath }) => {
    if (fileType.toLowerCase() === 'img') {
        return <Image alt={altText} src={filePath} />;
    }
    return React.createElement(fileType, mediaProps);
}

const Section = ({ body }) => {
    return (
        <div className="section">
            {Array.isArray(body) && body.map((part, idx) => (
                <React.Fragment key={idx}>
                    {createElement(part)}
                </React.Fragment>
            ))}
        </div>
    );
}

const Example = ({ body }) => {
    return (
        <div className="examplearea box column full-width outline">
            <div className="exampleHeader box full-width">
                <span>Example</span>
            </div>

            <div className='exampleBody full-width paper outline'>
                {body.map((part, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {createElement(part)}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    );
}

const Code = ({ body, language }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCodeCopy = (body) => {
        const codeContent = body.map(ele => ele.content).join("\n");

        navigator.clipboard.writeText(codeContent)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => console.error("Failed to copy text:", err));
    };

    return (
        <div className="codearea outline full-width box column">
            <div className="codeHeader box full-width codeLang">
                <p>{language}</p>
                <button
                    className="icon"
                    style={{ width: "20px", backgroundColor: "transparent" }}
                    onClick={() => handleCodeCopy(body)}
                >
                    {isCopied ? <Icon name={"check"} /> : <Icon name={"copy"} />}
                </button>
            </div>
            <pre className="codeBody paper outline full-width">
                {Array.isArray(body) && body.map((ele, idx) => {
                    // Ensure that `ele.content` is treated as plain text
                    if (typeof ele.content === 'string') {
                        return (
                            <React.Fragment key={idx}>
                                {createElement(ele)}
                            </React.Fragment>
                        );
                    } else {
                        console.error("Invalid element in code body:", ele.content);
                        return null; // Handle the invalid element case
                    }
                })}
            </pre>
        </div>
    );
}

const createElement = (part) => {
    switch (part.kind) {
        case "Section":
            return <Section body={part.body} />
        case "Example":
            return <Example body={part.body} />
        case "Code":
            return <Code body={part.body} language={part.language} />
        case "Heading":
            return <Heading level={part.level} text={part.text} />;
        case "Link":
            return <Link content={part.altText} url={part.url} />
        case "CodeLine":
            return <CodeLine content={part.content} />
        case "Breakline":
            return <Breakline />
        case "Img":
        case "Video":
        case "Audio":
            return <Media fileType={part.kind} fileText={part.altText} filePath={part.filePath} />;
        default:
            return <Text content={part.content} />
    }
}

export default createElement
import React, { useCallback, useEffect, useState } from "react";
import useProjects from "./useProjects";
import { tokenize } from "@/utils/lexer";
import { parseTokens } from "@/utils/ast";
import { useSelector } from "react-redux";
import Image from "next/image";

const useInputParser = () => {
    const selectedProject = useSelector(state => state.projectSlice.selectedProject);

    const [htmlTree, setHtmlTree] = useState([]);

    const { updateProjectContent } = useProjects();

    const createText = useCallback((content) => {
        return <p>{content}</p>;
    }, []);

    const createLink = useCallback((content, url) => {
        return <a href={url} className="articleLink">{content}</a>;
    }, []);

    const createHeading = useCallback((level, text) => {
        const HeadingTag = `h${level}`;
        return <HeadingTag>{text}</HeadingTag>;
    }, []);

    const createBreakline = useCallback(() => {
        return <br />;
    }, []);

    const createMedia = useCallback((fileType, altText, filePath) => {
        const mediaProps = { src: filePath, alt: altText };
        if (fileType.toLowerCase() === 'img') {
            return <Image {...mediaProps} />;
        }
        return React.createElement(fileType, mediaProps);
    }, []);

    const createSection = useCallback((body) => {
        return (
            <div className="section">
                {Array.isArray(body) && body.map((part, idx) => (
                    <React.Fragment key={idx}>
                        {createElement(part)}
                    </React.Fragment>
                ))}
            </div>
        );
    }, []);

    const createExample = useCallback((body) => {
        console.log('body: ', body);

        return (
            <div className="examplearea box column full-width outline">
                <div className="exampleHeader box full-width">
                    <span>Example</span>
                </div>

                <div className='exampleBody full-width paper outline'>
                    {body.map((part, idx) => {
                        console.log('part: ', part);

                        return (
                            <React.Fragment key={idx}>
                                {createElement(part)}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        );
    }, []);

    const createCode = useCallback((body, language) => {
        return (
            <div className="codearea outline full-width box column">
                <div className="codeHeader box full-width codeLang">
                    <p>{language}</p>
                </div>
                <pre className="codeBody paper outline full-width">
                    {Array.isArray(body) && body.map((ele, idx) => {
                        // Ensure that `ele.content` is treated as plain text
                        if (typeof ele.content === 'string') {
                            return (
                                <React.Fragment key={idx}>
                                    {ele.content}
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
    }, []);

    const createElement = useCallback((part) => {
        switch (part.kind) {
            case "Section":
                return createSection(part.body);
            case "Example":
                return createExample(part.body);
            case "Code":
                return createCode(part.body, part.language);
            case "Heading":
                return createHeading(part.level, part.text);
            case "Link":
                return createLink(part.altText, part.url);
            case "Text":
                return createText(part.content);
            case "Breakline":
                return createBreakline();
            case "Img":
            case "Video":
            case "Audio":
                return createMedia(part.kind, part.altText, part.filePath);
            default:
                return createText(part.content);
        }
    }, [
        createSection,
        createExample,
        createCode,
        createHeading,
        createLink,
        createBreakline,
        createMedia,
        createText
    ]);

    const updateText = useCallback((input, currentProject) => {
        if (currentProject) {
            updateProjectContent(currentProject.id, input);
        }
    }, [updateProjectContent]);

    useEffect(() => {
        if (selectedProject) {
            const tokens = tokenize(selectedProject.body);
            const ast = parseTokens(tokens, selectedProject);

            if (ast) {
                const elements = ast.map(part => createElement(part));

                setHtmlTree(elements);
            } else {
                console.log("No changes detected in the project body.");
            }
        }
    }, [selectedProject, createElement]);

    return {
        createElement,
        updateText,
        htmlTree
    };
};

export default useInputParser;


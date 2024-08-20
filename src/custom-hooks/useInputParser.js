import { useCallback, useEffect, useState } from "react";
import useProjects from "./useProjects";
import { tokenize } from "@/utils/lexer";
import { parseTokens } from "@/utils/ast";
import { useSelector } from "react-redux";
import createElement from "@/components/sections/Sections";

const useInputParser = () => {
    const selectedProject = useSelector(state => state.projectSlice.selectedProject);

    const [htmlTree, setHtmlTree] = useState([]);

    const { updateProjectContent } = useProjects();

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
    }, [selectedProject]);

    return {
        updateText,
        htmlTree
    };
};

export default useInputParser;


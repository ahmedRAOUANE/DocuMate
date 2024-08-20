export class Token {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
    }
}

const tokens = [];

const newToken = (tokenType, value = null) => {
    const token = new Token(tokenType, value);
    tokens.push(token);
}

// Regular Expressions for Matching Patterns
const patterns = {
    link: /"([^"]+)"->(https?:\/\/[^\s]+)/,
    heading: /^(#{1,5})\s*(.*)$/,
    img: /@img\s*(?:"([^"]+)")?\s*->\s*(.+)$/,
    video: /@video\s*->\s*(.+)$/,
    audio: /@audio\s*->\s*(.+)$/,
    title: /@title\s*->\s*(.+)$/,
};

// Function to handle different types of lines
const handleLine = (line, inCodeBlock) => {
    if (line.includes("@code starts")) {
        inCodeBlock = true;
        newToken("CodeOpening", line);
    } else if (line.includes("@code ends")) {
        inCodeBlock = false;
        newToken("CodeClosing", line);
    } else if (inCodeBlock) {
        newToken("CodeLine", line);
    } else {
        line = line.trimStart();
        if (line.trim() === "") {
            newToken("Breakline");
        } else if (line.includes("@done")) {
            newToken("EOF");
        } else if (line.includes("@section starts")) {
            newToken("SectionOpening", line);
        } else if (line.includes("@section ends")) {
            newToken("SectionClosing", line);
        } else if (line.includes("@example starts")) {
            newToken("ExampleOpening", line);
        } else if (line.includes("@example ends")) {
            newToken("ExampleClosing", line);
        } else {
            processLineContent(line);
        }
    }
    return inCodeBlock;
};

// Function to process line content outside of code blocks
const processLineContent = (line) => {
    if (matchPattern(line, "link")) return;
    if (matchPattern(line, "heading")) return;
    if (matchPattern(line, "img")) return;
    if (matchPattern(line, "video")) return;
    if (matchPattern(line, "audio")) return;
    if (matchPattern(line, "title")) return;

    newToken("Text", line); // Default to Text token if no pattern matches
};

// Function to match a line against a specific pattern
const matchPattern = (line, patternKey) => {
    const match = line.match(patterns[patternKey]);
    if (match) {
        switch (patternKey) {
            case "link":
                handleLinkMatch(match, line);
                break;
            case "heading":
                const [_, hashes, headingText] = match;
                newToken("Heading", { level: hashes.length, text: headingText });
                break;
            case "img":
                newToken("Img", { altText: match[1] ? match[1].trim() : "", filePath: match[2].trim() });
                break;
            case "video":
                newToken("Video", match[1].trim());
                break;
            case "audio":
                newToken("Audio", match[1].trim());
                break;
            case "title":
                newToken("ProjectTitle", match[1].trim());
                break;
        }
        return true;
    }
    return false;
};

// Function to handle matched links
const handleLinkMatch = (match, line) => {
    const [_, altText, url] = match;
    const preLinkText = line.slice(0, match.index).trim();
    if (preLinkText) {
        newToken("Text", preLinkText);
    }
    newToken("Link", { alt: altText, url: url });

    const postLinkText = line.slice(match.index + match[0].length).trim();
    if (postLinkText) {
        newToken("Text", postLinkText);
    }
};

// Main Tokenize Function
export const tokenize = (input) => {
    const lines = input.split("\n");
    let inCodeBlock = false;

    for (let line of lines) {
        inCodeBlock = handleLine(line, inCodeBlock);
    }

    return tokens;
};

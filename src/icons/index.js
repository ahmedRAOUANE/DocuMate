const ArrowDown = ({ className }) => {
    return (
        <svg className={className} style={{ width: "25px", height: "25px" }}>
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
        </svg>
    )
};

const ArrowRight = ({ className }) => {
    return (
        <svg className={className} style={{
            width: "25px",
            height: "25px",
            position: "absolute",
            right: "15px",
            transition: "0.1s ease-in",
            transform: `rotate(${className === "toRight" ? "0deg" : "90deg"})`,
            transformOrigin: "center"
        }}>
            <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
        </svg>
    )
};

const Remove = ({ className }) => {
    return (
        <svg className={className} style={{ width: "25px", height: "25px" }}>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
    )
}

const Pen = ({ className, style }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" style={style}>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
        </svg>
    )
}

const Icon = ({ name, className, style }) => {
    switch (name) {
        case "arrow-right":
            return <ArrowRight className={className} style={style} />
        case "arrow-down":
            return <ArrowDown className={className} style={style} />
        case "remove":
            return <Remove className={className} style={style} />
        case "pen":
            return <Pen className={className} style={style} />
        default:
            return null;
    }
}

export default Icon;
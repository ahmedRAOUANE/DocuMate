const arrowDown = (
    <svg
        style={{ width: "30px" }}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="KeyboardArrowDownIcon"
        title="KeyboardArrowDown"
    >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
    </svg>
);
const arrowRight = (
    <svg
        style={{ width: "25px" }}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowForwardIosIcon"
        title="ArrowForwardIos"
    >
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
    </svg>
);

const Icon = ({ name }) => {
    switch (name) {
        case "arrow-right":
            return arrowRight
        case "arrow-down":
            return arrowDown
        default:
            return null;
    }
}

export default Icon;
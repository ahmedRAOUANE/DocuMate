
const loading = () => {
    return (
        <div
            className="container full-width full-height box center-x center-y loaderContainer"
            style={{ position: "absolute", top: 0, left: 0 }}
        >
            <div className="loader">Loading</div>
        </div>
    )
}

export default loading
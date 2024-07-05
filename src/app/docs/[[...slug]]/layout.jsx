import Link from "next/link";

const DocsLayout = ({ children, subConcept, params }) => {
    const route = params.slug || [];

    if (route.length === 3) {
        return (
            <div>
                {subConcept}
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
};

export default DocsLayout;

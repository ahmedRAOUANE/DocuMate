import React, { useState } from 'react'
import Codearea from './Codearea'

const Examplearea = () => {

    const [examples, setExamples] = useState(false);
    const [examplesList, setExamplesList] = useState([{ id: 1, content: "", title: "example-1" }]);
    const [img, setImg] = useState(null);

    const addExampleField = () => {
        const newId = examplesList.length ? examplesList[examplesList.length - 1].id + 1 : 1;
        setExamplesList(prev => [...prev, { id: newId, content: "", title: `example-${newId}` }]);
    };

    const removeExampleField = (idToRemove) => {
        setExamplesList(prev => prev.filter(example => example.id !== idToRemove));
    };

    const handleExampleChange = (id, content) => {
        setExamplesList(prev => prev.map(example => example.id === id ? { ...example, content } : example));
    };

    return (
        <>
            <div className="examplearea box column full-width outline">
                <div className="exampleInfo box full-width">
                    <input type="text" className="exampleTitle transparent full-width small" defaultValue={"example"} />
                    <button className='danger' type="button">Remove</button>
                </div>

                <div className='exampleContent full-width paper outline'>
                    <textarea
                        className='full-width'
                        type="text"
                        placeholder={`Example`}
                        style={{ minHeight: "100px" }}
                    />
                    <Codearea lang={"code lang"} />
                </div>
            </div>
            {/* {examples && examplesList.map(example => (
                <div key={example.id} className="examplearea box column full-width outline">
                    <div className="exampleInfo box full-width">
                        <input type="text" className="exampleTitle transparent full-width small" defaultValue={"example"} />
                        <button className='danger' type="button" onClick={() => removeExampleField(example.id)}>Remove</button>
                    </div>

                    <div className='exampleContent full-width paper outline'>
                        <textarea
                            className='full-width'
                            type="text"
                            value={example.content}
                            onChange={(e) => handleExampleChange(example.id, e.target.value)}
                            placeholder={`Example ${example.id}`}
                            style={{ minHeight: "100px" }}
                        />
                        <Codearea lang={"code lang"} />
                    </div>
                </div>
            ))} */}
            {/* {examples && <button type="button" onClick={addExampleField}>Add Another Example</button>} */}
        </>
    )
}

export default Examplearea
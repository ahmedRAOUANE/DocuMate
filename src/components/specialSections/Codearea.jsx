import React from 'react'

const Codearea = ({ lang }) => {
    return (
        <div className="codearea outline full-width">
            <div className="box full-width codeLang" style={{ flex: 0 }}>
                <p>{lang}</p>
                <input className='small' type="text" />
            </div>
            <div className='code paper outline'>
                <textarea placeholder='type your code' name="code" id="code"></textarea>
            </div>
        </div>
    )
}

export default Codearea
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='box column full-height jc-start container'>
            <h2>welcome there</h2>
            <div className="box">
                <div className="full-width">
                    <p>are you ready to build your owne docs</p>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
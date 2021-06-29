import React from 'react'

function ButtonLeft(props) {

    return (
        <div className="absolute left-0 top-1/3 " onClick={props.onClick}>
            <svg className="" width="12" height="20" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.834 24.6668L1.16732 13.0002L12.834 1.3335" stroke="#676792" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    )
}

export default ButtonLeft

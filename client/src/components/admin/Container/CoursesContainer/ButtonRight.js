import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'

function ButtonRight(props) {

    return (
        <div className="absolute right-0 top-1/3" onClick={props.onClick}>
            <svg width="12" height="20" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.16602 1.33317L12.8327 12.9998L1.16602 24.6665" stroke="#676792" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </div>
    )
}

export default ButtonRight

import React from 'react'

function CourseNameHeading(props) {
    return (
        <div className="text-navy text-lg text-center md:text-left md:px-64 mx-4">
            {props.text}
        </div>
    )
}

export default CourseNameHeading

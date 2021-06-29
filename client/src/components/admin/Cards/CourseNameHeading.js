import React from 'react'

function CourseNameHeading(props) {
    return (
        <div className="text-navy text-lg  md:mx-40 md:px-2 lg:mx-60 lg:px-2 text-center">
            <p className=" md:text-left mb-0">{props.text}</p>
        </div>
    )
}

export default CourseNameHeading

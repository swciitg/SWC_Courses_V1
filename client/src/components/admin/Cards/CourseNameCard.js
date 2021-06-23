import React from 'react'

function CourseNameCard(props) {
    return (
        <div className="bg-bgColor text-navy text-sm m-4 rounded w-56 text-center py-6">
            {props.text}
        </div>
    )
}

export default CourseNameCard

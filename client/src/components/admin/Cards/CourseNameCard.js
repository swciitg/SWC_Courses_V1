import React from 'react'

function CourseNameCard(props) {
    return (
        <div className="bg-bgColor text-navy text-sm my-4 mx-4 rounded text-center py-6">
            {props.text}
        </div>
    )
}

export default CourseNameCard

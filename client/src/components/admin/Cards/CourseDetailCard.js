import React from 'react';
import BookmarkSVG from './BookmarkSVG'

function CourseDetailCard() {
    return (
        <div className="m-4 rounded bg-bgColor pb-8">
        <img className="rounded border border-cardBorder " src="https://source.unsplash.com/1600x900/?tech" alt="Course Picture" />
        <div className="mt-2 relative px-2">
        <p className="w-10/12 text-sm"> Energy Transfer Biothermodynamics</p>
        
        <div className="w-2/12 absolute top-1 right-0 pl-2">
        <BookmarkSVG />
        </div>
        </div>
        <p className="text-xs w-9/12 inline-block pl-2 my-2"> Biotechnology</p> 
        <p className="text-xs text-right w-3/12 inline-block pr-2">BT 202</p>
        <p className="text-xs pl-2"> Mr. Priyadarshi satpati </p>
    </div>
    )
}

export default CourseDetailCard

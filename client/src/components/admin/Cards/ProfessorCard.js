import React from 'react'

function ProfessorCard() {
    return (
        <div className="m-4 rounded bg-bgColor pb-8">
        <div className="border bg-white border-cardBorder h-28 flex rounded">

        
        <img className="rounded-full my-auto w-4/12 mx-2" width="75" src="https://source.unsplash.com/100x100/?professor " alt="Course Picture" />
        <div className="text-sm w-8/12 flex">
        <p className="my-auto content-center mx-auto px-2"> Mrs. Rashmi Dutta </p>
        </div>
        
        </div>
        <p className="px-2 text-sm text-center mt-4"> Energy Transfer Biothermodynamics</p>
        

        <button className="bg-white py-2 px-4 w-10/12 mx-4 mt-4 shadow-lg" > View Courses</button>
        {/* style={{boxShadow : 'box-shadow: 1px 2px 19px -8px rgba(0, 17, 166, 0.2);'}} */}
    </div>
    
    )
}

export default ProfessorCard

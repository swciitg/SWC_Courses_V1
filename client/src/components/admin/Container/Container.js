import React from 'react'
import Svgimg from '../../../assets/Svgimg'

function Container() {
    return (
        <div className="bg-bgColor flex">
            <div className=" w-6/12 flex ">

            <div className="my-auto">
                <div className="text-temp font-bold text-right ml-48 my-3"> Welcome to Course Directory,</div>
                <div className="text-md text-left inline-block ml-48 pl-5 my-3">Your one-stop platform to all academic courses of IIT Guwahati including 
                    videos, study material, assignments as well as solving queries.  </div>

                <div className="px-4 flex ml-48 my-3 justify-center">
                    <span className=" border-navy border rounded text-center text-base px-4 py-1.5">Sign Up for free</span>
                </div>
            </div>


            </div>
                <div className="w-6/12 ">

                <div className="w-10/12 my-36 py-1 mx-auto pr-20">
                    <Svgimg />
                </div>
                 
            </div>
            
        </div>
    )
}

export default Container

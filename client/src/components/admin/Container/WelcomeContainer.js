import React from 'react'
import WelcomeContainerSVG from '../../../assets/WelcomeContainerSVG'

function WelcomeContainer() {
    return (
        <div className="bg-bgColor lg:flex lg:flex-row-reverse pb-6">
                    <div className="lg:w-6/12 ">

            <div className="lg:w-10/12 w-7/12 lg:my-36 py-1 mx-auto lg:pr-20 mt-20">
                <WelcomeContainerSVG />
            </div>
            
            </div>

            <div className=" lg:w-6/12 lg:flex ">

            <div className="my-auto lg:mx-0 mx-8">
                <div className="text-3xl md:text-homeLgText font-bold text-center lg:text-right lg:ml-48 my-3"> Welcome to Course Directory,</div>
                <div className="text-md lg:text-left text-center inline-block lg:ml-48 pl-5 my-3">Your one-stop platform to all academic courses of IIT Guwahati including 
                    videos, study material, assignments as well as solving queries.  </div>

                <div className="px-4 flex lg:ml-48 my-3 justify-center">
                    <span className="border-1 border-navy rounded text-center px-4 py-1.5">Sign Up for free</span>
                </div>
            </div>


            </div>

            
        </div>
    )
}

export default WelcomeContainer

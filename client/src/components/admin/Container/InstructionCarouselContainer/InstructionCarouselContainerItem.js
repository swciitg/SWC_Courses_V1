import React from 'react'
import InstructionCarouselContainerItemSVG from './InstructionCarouselContainerItemSVG'
function InstructionCarouselContainerItem() {
    return (
        <div className="lg:flex lg:flex-row-reverse">

        <div className="lg:w-6/12 box-border py-2">
        <div className="lg:w-7/12 w-5/12 mx-auto mt-10 mb-2 lg:my-28 lg:pr-10">
        <InstructionCarouselContainerItemSVG />
        </div>
        </div>
        <div className="lg:w-6/12 flex items-center">
            <div className="font-sans text-center mb-6 lg:mb-0 text-2xl md:text-3xl mx-auto lg:pl-16">
            1. Enroll now and get started.
            </div>
        </div>
        </div>
    )
}

export default InstructionCarouselContainerItem

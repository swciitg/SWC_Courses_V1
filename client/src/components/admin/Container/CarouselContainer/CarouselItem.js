import React from 'react'
import CarouselSVG from './CarouselSVG'
function CarouselItem() {
    return (
        <div className="flex">
        <div className="w-6/12 flex items-center">
            <div className="font-sans text-3xl mx-auto pl-4">
            1. Enroll now and get started.
            </div>
        </div>
        <div className="w-6/12 box-border py-2">
        <div className="w-7/12 my-28">
        <CarouselSVG />
        </div>
        
        </div>
            
        </div>
    )
}

export default CarouselItem

import React ,{useState} from 'react'
import CourseNameCard from '../../Cards/CourseNameCard'
import CourseNameHeading from '../../Cards/CourseNameHeading'
import CourseDetailCard from '../../Cards/CourseDetailCard'
import ProfessorCard from '../../Cards/ProfessorCard'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup'

function CoursesContainer() {

    const subjects = ['Web Development Tech.. ','Functional and Logical..','Wireless Networks','Mobile Computing','Data Structure an...','Web Development Tech.. ','Functional and Logical..','Wireless Networks','Mobile Computing']
    const branchSubs = ['Biotechnology', 'Chemical Engineering','Chemical Science and Tech..','Civil Engineering','Computer Science','Chemical Engineering','Chemical Science and Tech..','Civil Engineering','Computer Science' ]

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1400 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1400, min: 900 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 900, min: 520 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 520, min: 0 },
          items: 1
        }
      };


    return (

        <div className="bg-white">
        <div className="py-6">
        <CourseNameHeading text="Topics"/>
        <div className="mx-8 sm:mx-12 md:mx-36 lg:mx-56 relative">

        <Carousel arrows={false} responsive={responsive} 
        className="  pb-6"
        containerClass="" 
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside
        showDots
        >

        {subjects.map(subject=>{
            return (<CourseNameCard text={subject} />)
        })}

        </Carousel>

        </div>
        </div>

        <div className="py-6">
        <CourseNameHeading text="Branch Wise Courses"/>
        <div className="mx-8 sm:mx-12 md:mx-36 lg:mx-56 relative">

        <Carousel arrows={false} responsive={responsive} 
        className="w-carouselWidth mx-auto pb-6"
        // containerClass="container" 
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside
        showDots
        >
        {branchSubs.map(subject=>{
            return (<CourseNameCard text={subject} />)
        })}
        </Carousel>
        </div>
        </div>

        <div className="py-6">
        
        <CourseNameHeading text="Popular Lectures for You"/>
        <div className="mx-8 sm:mx-12 md:mx-36 lg:mx-56 relative">
        <Carousel arrows={false} responsive={responsive} 
        className="w-carouselWidth mx-auto pb-6"
        // containerClass="container" 
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside
        showDots
        >
        {branchSubs.map(subject=>{
            return (<CourseDetailCard text={subject} />)
        })}
        </Carousel>
        </div>
        </div>

        <div className="py-6">
        <CourseNameHeading text="Professors"/>
        <div className="mx-8 sm:mx-12 md:mx-36 lg:mx-56 relative">
        <Carousel arrows={false} responsive={responsive} 
        className="w-carouselWidth mx-auto pb-6"
        // containerClass="container" 
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside
        showDots
        >
        {branchSubs.map(subject=>{
            return (<ProfessorCard text={subject} />)
        })}
        </Carousel>
        </div>
        </div>

        </div>
        
    )
}

export default CoursesContainer

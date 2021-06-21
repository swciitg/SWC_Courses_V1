import React from 'react'
import CourseNameCard from '../../Cards/CourseNameCard'
import CourseNameHeading from '../../Cards/CourseNameHeading'
import CourseDetailCard from '../../Cards/CourseDetailCard'
import ProfessorCard from '../../Cards/ProfessorCard'
function MainContainer() {

    const subjects = ['Web Development Tech.. ','Functional and Logical..','Wireless Networks','Mobile Computing']
    const branchSubs = ['Biotechnology', 'Chemical Engineering','Chemical Science and Tech..','Civil Engineering' ]
    return (

        <div className="bg-white">
        <div className="py-6">
        <CourseNameHeading text="Topics"/>
        <div className=" flex justify-center mt-4">
        {subjects.map(subject=>{
            return (<CourseNameCard text={subject} />)
        })}
        </div>
        </div>

        <div className="py-6">
        <CourseNameHeading text="Branch Wise Courses"/>
        <div className=" flex justify-center mt-4">
        {branchSubs.map(subject=>{
            return (<CourseNameCard text={subject} />)
        })}
        </div>
        </div>

        <div className="py-6">
        <CourseNameHeading text="Popular Lectures for You"/>
        <div className=" flex justify-center mt-4">
        {branchSubs.map(subject=>{
            return (<CourseDetailCard text={subject} />)
        })}
        </div>
        </div>

        <div className="py-6">
        <CourseNameHeading text="Professors"/>
        <div className=" flex justify-center mt-4">
        {branchSubs.map(subject=>{
            return (<ProfessorCard text={subject} />)
        })}
        </div>
        </div>
        </div>
        
    )
}

export default MainContainer

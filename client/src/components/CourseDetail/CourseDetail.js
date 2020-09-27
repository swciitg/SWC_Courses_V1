import React, { Component } from 'react'
import DashBoard from './DashBoard/DashBoard'

class CourseDetail extends Component {
    render() {
        return (
            <div className="p-3 p-sm-4" style={{ backgroundColor: "#FFE031", height: "100vh" }}>
                <DashBoard />
            </div>
        )
    }
}

export default CourseDetail;

import React from 'react'
import Categories from '../etc/Categories'
import Search from '../Search/Search'

function Navbar() {
    return (
        <div className=" overflow-hidden pt-8 pl-6 pr-12 font-sans">
            <div className=" flex float-left">
                <div className="text-navBlue text-2xl font-bold  mx-5">
                    Course Directory
                </div>
                <Categories />
                <Search />
            </div>


            <div className=" flex place-content-center float-right font-sans font-bold text-sm text-navy py-2.5 mr-2">
                <a className="my-auto mx-3"> Admin Panel</a>
                <a className="my-auto mx-3"> Sign In</a>
            </div>
        </div>
    )
}

export default Navbar

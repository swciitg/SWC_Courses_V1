import React from 'react'

function Search() {
    return (
        <div className="w-80 flex border-navy border-1 rounded px-1 mx-2 my-1">
            <svg class="my-auto mx-1.5" width="19" height="20" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.2403 16.7071L19.7643 20.222M18.9771 9.98856C18.9771 14.9528 14.9528 18.9771 9.98856 18.9771C5.02431 18.9771 1 14.9528 1 9.98856C1 5.02431 5.02431 1 9.98856 1C14.9528 1 18.9771 5.02431 18.9771 9.98856Z" stroke="#142661" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

            <input class="w-full text-xs text-navy placeholder-navy focus:outline-none my-2" placeholder="Department, Course name, Course code or Professor"/> 
        </div>
    )
}

export default Search

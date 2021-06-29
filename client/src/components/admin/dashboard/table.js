import React from "react";

const Table = (props) =>{

    return(
        
        <div className="bg-white mr-16 mt-4 ml-4  h-80">

        <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                    <th scope="col" class="px-6 py-3 text-left text-lg font-medium   tracking-wider font-semibold">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-lg font-medium  tracking-wider font-semibold">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-lg font-medium   tracking-wider font-semibold">
                        Size
                    </th>
                   
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900 font-semibold">
                        First Video
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900 font-semibold">24-06-2021</div>
                        
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900 font-semibold">1 GB</div>
                        
                    </td>

                    </tr>

                    
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
           
        </div>

    )
};

export default Table;
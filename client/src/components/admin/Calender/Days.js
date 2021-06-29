//import './Single'
import Single from "./Single";


const DaysOfWeek = [
    {
      id: "1",
      name: "Sunday",
      
      
    },
    {
      id: "2",
      name: "Monday",
      
    },
    {
      id: "3",
      name: "Tuesday",
      
    },
    {
      id: "4",
      name: "Wednesday",
      
    },
    {
      id: "5",
      name: "Thursday",
      
    },
    {
      id: "6",
      name: "Friday",
      
    },
    {
      id: "7",
      name: "Saturday",
      
    },
    
  ];

function createDays(loop) {
    return (
      <Single
        key={loop.id}
        name={loop.name}
      />
    );
  }

const Days=()=>{
    return(
        <div className="flex  mb-6 mt-2 flex-row gap-5 justify-center h-144">
            {DaysOfWeek.map(createDays)} 
        </div>
    );
}
export default Days;
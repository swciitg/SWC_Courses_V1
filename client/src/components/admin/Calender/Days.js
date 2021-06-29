//import './Single'
import Single from "./Single";


const DaysOfWeek = [
    {
      id: "1",
      name: "Sunday",
      num: "30",
      
    },
    {
      id: "2",
      name: "Monday",
      num: "31",
    },
    {
      id: "3",
      name: "Tuesday",
      num: "1",
    },
    {
      id: "4",
      name: "Wednesday",
      num: "2",
    },
    {
      id: "5",
      name: "Thursday",
      num: "3",
    },
    {
      id: "6",
      name: "Friday",
      num: "4",
    },
    {
      id: "7",
      name: "Saturday",
      num: "5",
    },
    
  ];

function createDays(loop) {
    return (
      <Single
        key={loop.id}
        name={loop.name}
        num={loop.num}
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
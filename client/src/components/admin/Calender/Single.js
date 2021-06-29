const Single=(props)=>{
    return <div className="bg-white text-center w-40 pt-3 items-stretch">{props.name}
    <div className="text-left pt-4 ml-4">
        {props.num}
    </div>
    </div>
}
export default Single;
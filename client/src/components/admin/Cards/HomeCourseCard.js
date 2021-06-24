const HomeCourseCard = (props) => {
  return (
    <div className="bg-white h-36 w-56 flex justify-around items-center">
      <span className="font-sans text-grayText font-medium text-2xl">{props.courseName}</span>
    </div>
  );
};

export default HomeCourseCard;
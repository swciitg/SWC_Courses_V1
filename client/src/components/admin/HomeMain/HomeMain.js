import WelcomeContainerSVG from '../../../assets/WelcomeContainerSVG';
import HomeCourseCard from '../Cards/HomeCourseCard';

const HomeMain = (props) => {
  return (
    <div className="bg-bgColor px-52 py-20">
      <div className="flex items-center justify-between">
        <div className="text-navy font-sans font-bold flex flex-col">
          <div className="text-4xl mb-10">Welcome Back {props.name}!</div>
          <div className="text-xl">Lorem Impsum dolor sit<br />00 students are taking your courses</div>
        </div>
        <div className="w-5/12">
          <WelcomeContainerSVG />
        </div>
      </div>

      <p className="text-navy font-sans font-bold mt-14 mb-3">Your Courses</p>
      <div className="flex justify-between flex-wrap">
        <HomeCourseCard courseName="CS101" />
        <HomeCourseCard courseName="CS102" />
        <HomeCourseCard courseName="CS101" />
        <HomeCourseCard courseName="CS102" />
      </div>
    </div>
  );
};

export default HomeMain;
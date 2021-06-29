import '../../App.css';
import Navbar from '../../components/admin/Navbar/Navbar';
import WelcomeContainer from '../../components/admin/Container/WelcomeContainer';
import InstructionCarouselContainer from '../../components/admin/Container/InstructionCarouselContainer/InstructionCarouselContainer';
import CoursesContainer from '../../components/admin/Container/CoursesContainer/CoursesContainer'
import Footer from '../../components/admin/Footer/Footer';

function App() {
  return (
    <div className="bg-bgColor text-navy">
      <Navbar />
      <WelcomeContainer />
      <InstructionCarouselContainer />
      <CoursesContainer />
      <Footer />
    </div>
  );
}

export default App;

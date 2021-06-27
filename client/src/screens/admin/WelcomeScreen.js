import Navbar from "../../components/admin/Navbar/Navbar";
import Container from "../../components/admin/Container/Container";
import CarouselContainer from "../../components/admin/Container/CarouselContainer/CarouselContainer";
import MainContainer from "../../components/admin/Container/MainContainer/MainContainer";
import Footer from "../../components/admin/Footer/Footer";

const WelcomeScreen = () => {
  return (
    <>
      <Navbar />
      <Container />
      <CarouselContainer />
      <MainContainer />
      <Footer />
    </>
  );
};

export default WelcomeScreen;
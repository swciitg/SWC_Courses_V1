import './App.css';
import Navbar from './components/admin/Navbar/Navbar';
import Container from './components/admin/Container/Container';
import CarouselContainer from './components/admin/Container/CarouselContainer/CarouselContainer';
import MainContainer from './components/admin/Container/MainContainer/MainContainer'
import Footer from './components/admin/Footer/Footer';

import Main from './components/admin/dashboard/main';


import Home from './screens/admin/Home';

function App() {
  return (
    <div className="bg-bgColor text-navy">
      
      
      <Navbar />
      <Container />
      <CarouselContainer />
      <MainContainer />
      <Footer />
      <Home/>
      <Main/>
    </div>

    
  );
}

export default App;

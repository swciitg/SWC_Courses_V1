import React, {useState} from 'react'
import InstructionCarouselContainerItem from './InstructionCarouselContainerItem'
import Carousel from 'react-bootstrap/Carousel';

function InstructionCarouselContainer() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


    return (
        
        <div className="bg-white">
        <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
            <InstructionCarouselContainerItem />
      </Carousel.Item>
      <Carousel.Item>
            <InstructionCarouselContainerItem />
      </Carousel.Item>
      <Carousel.Item>
            <InstructionCarouselContainerItem />
      </Carousel.Item>
    </Carousel>
        </div>
    )
}

export default InstructionCarouselContainer

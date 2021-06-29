import React from 'react'
import ButtonLeft from './ButtonLeft';
import ButtonRight from './ButtonRight';

function ButtonGroup({ next, previous, goToSlide, ...rest }) {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group overflow-visible"> 
      {/* // remember to give it position:absolute */}
        <ButtonLeft className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
        <ButtonRight onClick={() => next()} />
        {/* <button onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </button> */}
      </div>
    );
}

export default ButtonGroup

import React from 'react';
import { Carousel } from 'react-bootstrap';


const CarouselContainer = () => {
    return (
            <Carousel controls={false}>
                    <Carousel.Item interval={5000}>
                    <img
                        src='https://www.rememberthemilk.com/img/hp_steve_2.png?1587967172'
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>You Made the List!</h3>
                        <p>You'll never forget who or what is on your list again.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                <Carousel.Item interval={5000}>
                <img
                    id= "image-3"
                    src='https://www.rememberthemilk.com/img/hp_steve_3.png?1587967172'
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Get your Tasks done.</h3>
                    <p>Search your list and set due dates to get things done faster.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <Carousel.Caption>
                        <h3>Get Lists out of your head.</h3>
                        <p>Stop thinking about your List, and let the app remember for you.</p>
                    </Carousel.Caption>
                <img
                    src='https://www.rememberthemilk.com/img/hp_steve_1.png?1587967172'
                    alt="Third slide"
                />
                </Carousel.Item>
        </Carousel>
    )
  }

  export default CarouselContainer;

  //test
  

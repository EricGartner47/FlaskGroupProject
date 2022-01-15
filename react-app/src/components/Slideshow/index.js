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
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                <img
                    id= "image-3"
                    src='https://www.rememberthemilk.com/img/hp_steve_3.png?1587967172'
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                <img
                    src='https://www.rememberthemilk.com/img/hp_steve_1.png?1587967172'
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
    )
  }

  export default CarouselContainer;

























// import React, {useState, useEffect} from 'react';

// import './Slideshow.css'

// const Slideshow = ({images=[], interval=3000}) => {
//     const [thumbnails, setThumbnails] = useState([]);
//     const [previousSlideStyle, setPreviousSlideStyle] = useState({});
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [nextSlideStyle, setNextSlideStyle] = useState({});
//     const [currentSlideStyle, setCurrentSlideStyle] = useState({});

//      useEffect(()=>{
//         setThumbnails(images);
//         setCurrentSlideStyle({
//             backgroundImage: "url('"+images[currentSlide]+"')"
//         });
//         if(currentSlide>0){
//             setPreviousSlideStyle({
//                 backgroundImage: "url('"+images[currentSlide-1]+"')"
//             });
//         }else{
//             setPreviousSlideStyle({
//                 backgroundImage: "url('"+images[images.length-1]+"')"
//             });
//         }

//         if(currentSlide === images.length-1){
//             setNextSlideStyle({
//                 backgroundImage: "url('"+images[0]+"')"
//             });
//         }else{
//             setNextSlideStyle({
//                 backgroundImage: "url('"+images[currentSlide+1]+"')"
//             });
//         }
//         const loop = setInterval(()=>{
//             if(currentSlide === images.length-1){
//                 setCurrentSlide(0);
//             }else{
//                 setCurrentSlide(currentSlide+1);
//             }
//         }, interval);
//         return ()=> clearInterval(loop)
//     }, [images, currentSlide, interval]);

//     function previous(){
//         if(currentSlide>0){
//             setCurrentSlide(currentSlide-1);
//         }else{
//             setCurrentSlide(thumbnails.length-1);
//         }
//     }

//     function next(){
//         if(currentSlide === thumbnails.length-1){
//             setCurrentSlide(0);
//         }else{
//             setCurrentSlide(currentSlide+1);
//         }
//     }
//     return (
//       <section className='slideshow'>
//           <div className="slide-holder"></div>
//             <section className='slide previous-slide'>
//                 <div style={previousSlideStyle} className='slide-thumbnail'>test 1</div>
//             </section>
//             <section className='slide current-slide'>
//                 <div style={currentSlideStyle}className='slide-thumbnail'> test 2</div>
//             </section>
//             <section className='slide next-slide'>
//                 <div style={nextSlideStyle} className='slide-thumbnail'> test 3</div>
//             </section>
//           <div className='slideshow-controller'>
//             <span onClick={previous}>Previous</span>
//             <span onClick={next}>Next</span>
//           </div>
//       </section>
//     )
// };

// export default Slideshow;

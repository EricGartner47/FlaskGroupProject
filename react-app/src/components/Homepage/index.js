import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CarouselContainer from '../Slideshow';

import './Homepage.css'

const Homepage = () => {
    const user = useSelector(state => state.session.user);

    if (user) {
        return (
        <Redirect to="/app" />
        )
    }

    else return (
        <>
            <h1 id='homepage-header'>The smart to-do app for busy people.</h1>
            <a href="/sign-up" id='homepage-signup-button'> Sign Up Free</a>
            <div id='slideshow-container'>
                <CarouselContainer />
            </div>
            <footer id='homepage-footer'>
                <ul> Created by:
                    <li > Joe Yang
                        <a className="gitHub-link" href="https://github.com/josephjyang">Github</a>
                        <a className="linkedIn-link"href="https://www.linkedin.com/in/josephjyang/">Linked In</a>
                    </li>
                    <li> Ricky Thang
                        <a className="gitHub-link" href="https://github.com/rickythewriter">Github</a>
                        <a className="linkedIn-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">Linked In</a>
                    </li>
                    <li> Eric Gartner
                        <a className="gitHub-link" href="https://github.com/EricGartner47">Github</a>
                        <a className="linkedIn-link"href="https://www.linkedin.com/in/eric-gartner-731907a0/">Linked In</a>
                    </li>
                </ul>
            </footer>
        </>
    );
}


export default Homepage;

/* <Slideshow
                    interval={3000}
                    images={[
                            'https://www.rememberthemilk.com/img/hp_steve_2.png?1587967172',
                            'https://www.rememberthemilk.com/img/hp_steve_3.png?1587967172',
                            'https://www.rememberthemilk.com/img/hp_steve_1.png?1587967172'
  ]} /> */

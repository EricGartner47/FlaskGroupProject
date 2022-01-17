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
                <div className='footer-nav-div'>
                    <ul>
                        <li className='nav-footer-header'>
                            Joe Yang:
                        </li>
                        <li>
                            <a className="gitHub-link" href="https://github.com/josephjyang">Github</a>
                        </li>
                        <li>
                            <a className="linkedIn-link"href="https://www.linkedin.com/in/josephjyang/">Linked In</a>
                        </li>
                    </ul>
                </div>
                <div className='footer-nav-div'>
                    <ul>
                        <li className='nav-footer-header'>
                            Ricky Thang:
                        </li>
                        <li>
                            <a className="gitHub-link" href="https://github.com/rickythewriter">Github</a>
                        </li>
                        <li>
                            <a className="linkedIn-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">Linked In</a>
                        </li>
                    </ul>
                </div>
                <div className='footer-nav-div'>
                    <ul>
                        <li className='nav-footer-header'>
                            Eric Gartner:
                        </li>
                        <li>
                            <a className="gitHub-link" href="https://github.com/EricGartner47">Github</a>
                        </li>
                        <li>
                            <a className="linkedIn-link"href="https://www.linkedin.com/in/eric-gartner-731907a0/">Linked In</a>
                        </li>
                    </ul>
                </div>
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


import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
            <footer id='homepage-footer'>
                <ul> Created by:
                    <li key="Joe-links"> Joe Yang
                        <a key="Joe-GitHub" className="gitHub-link" href="https://github.com/josephjyang">Github</a>
                        <a key="Joe-Linked-In" className="linkedIn-link"href="https://www.linkedin.com/in/josephjyang/">Linked In</a>
                    </li>
                    <li key="Ricky-links"> Ricky Thang
                        <a key="Ricky-GitHub" className="gitHub-link" href="https://github.com/rickythewriter">Github</a>
                        <a key="Ricky-Linked-In" className="linkedIn-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">Linked In</a>
                    </li>
                    <li key="Eric-links"> Eric Gartner
                        <a key="Eric-GitHub" className="gitHub-link" href="https://github.com/EricGartner47">Github</a>
                        <a key="Eric-Linked-In" className="linkedIn-link"href="https://www.linkedin.com/in/eric-gartner-731907a0/">Linked In</a>
                    </li>
                </ul>
            </footer>
        </>
    );
}

export default Homepage;

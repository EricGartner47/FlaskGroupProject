
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
            <h1>My Home Page</h1>
            <ul> Created by:
                <li key="links"> Joe Yang
                    <a key="GitHub" className="gitHub-link" href="https://github.com/josephjyang">Github</a>
                    <a key="Linked In" className="linkedIn-link"href="https://www.linkedin.com/in/josephjyang/">Linked In</a>
                </li>
                <li key="links"> Ricky Thang
                    <a key="GitHub" className="gitHub-link" href="https://github.com/rickythewriter">Github</a>
                    <a key="GitHub" className="gitHub-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">Linked In</a>
                </li>
                <li key="links"> Eric Gartner
                    <a key="GitHub" className="gitHub-link" href="https://github.com/EricGartner47">Github</a>
                    <a key="Linked In" className="linkedIn-link"href="https://www.linkedin.com/in/eric-gartner-731907a0/">Linked In</a>
                </li>
            </ul>
        </>
    );
}

export default Homepage;

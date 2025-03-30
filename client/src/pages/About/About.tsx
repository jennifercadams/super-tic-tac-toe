import * as React from "react";
import { Link } from "react-router";

const About = () => {
    return (
        <div className="about static-page">
            <h2>About</h2>
            <div className="content">
                <p>Hi, I&apos;m Jenn! I&apos;m a queer software developer based in Pittsburgh.</p>
                <p>This app was inspired by <a href="https://www.youtube.com/watch?v=_Na3a1ZrX7c" target="_blank" rel="noopener noreferrer">this Vsauce video</a>. It was built with React, Node, Express, and Socket.IO.</p>
                <p>If you enjoyed the game, you can:</p>
                    <ul>
                        <li><a href="https://bsky.app/profile/pankylosaurus.bsky.social" target="_blank" rel="noopener noreferrer">Follow me on Bluesky</a></li>
                        <li><a href="https://ko-fi.com/jennifercadams" target="_blank" rel="noopener noreferrer">Support me on Ko-fi</a></li>
                    </ul>
                <p>Please feel free to reach out if you find any bugs in the game.</p>
                <p>Thanks for playing!</p>
            </div>
            <Link className="ui-button" to="/">Home</Link>
        </div>
    );
};

export default About;

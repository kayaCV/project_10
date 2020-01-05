import React from 'react';

const Header = (props) => {
    return(

        <div className="header">
            <div className="bounds">
            <h1 className="header--logo">{props.title}</h1>
            <nav><span>Welcome {props.name}!</span><a className="signout" href="index.html">Sign Out</a></nav>
            </div>
        </div>

    )
    
};

export default Header;
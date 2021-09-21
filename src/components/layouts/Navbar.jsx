import React from "react";
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

 const Navbar= ({icon,title})=> {

  

    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon} ></i>{title}
        </h1>

        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
    )
  
}

Navbar.defaultProps = {
  icon:'fa fa-github m-r',
  title:'Github Finder'
}

Navbar.propTypes = {
 title:propTypes.string.isRequired,
 icon:propTypes.string.isRequired
}

export default Navbar;

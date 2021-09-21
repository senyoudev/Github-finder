import React, { useState } from "react";
import PropTypes from 'prop-types';

const Search =({setAlert,searchUsers,showClearBtn,clear})=> {
 const [text,setText]=useState('');

 const onSubmit = (e)=> {
      e.preventDefault();
     if(text === '') {
         setAlert('Please enter something', 'light')
     } else {
        searchUsers(text)
        setText('');
     }
  };

  const onChange = (e)=> {
setText(e.target.value)
 };

  
    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={text}
            onChange={onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
            
          />
          {showClearBtn && <button onClick={clear} className="btn btn-light btn-block" > Clear</button>} 
        </form>
      </div>
    );
  }


Search.propTypes = {
  searchUsers : PropTypes.func.isRequired,
  clear : PropTypes.func.isRequired,
  showClearBtn:PropTypes.bool.isRequired,
}



export default Search;

import React from 'react'
import "./Main_Screen.css";

function Image({imageUrl}) {
  return (
    <div class="icon-container">
     <img src={imageUrl} className="logo" alt='login-icon'></img>

    </div>
  )
}

export default Image;
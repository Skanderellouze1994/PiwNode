import React, { Component } from 'react';
import Linkify from 'react-linkify';


const TextMessage = (props) => {
  return <div className="sc-message--text">
    {props.name&&<span style={{fontSize:12}}>{props.name}</span>&&<br/>}{

    <Linkify properties={{ target: '_blank' }}>{props.data.text}</Linkify>
  }</div>
}

export default TextMessage
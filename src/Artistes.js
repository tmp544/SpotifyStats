import React from 'react';
import './Stats.css';

const Artistes = (props) => {
  return (
    <div className="stats">
      <p className="stats-classement">{props.index}</p>
      <img className="stats-img" src={props.imageUrl} />
      <p className="stats-titre stats-text">{props.nom}</p>
    </div>
  );
};

export default Artistes;

import React from 'react';
import './Stats.css';

const Sons = (props) => {
  return (
    <div className="stats">
      <p className="stats-classement">{props.index}</p>
      <img className="stats-img-album" src={props.imageUrl} />
      <div className="stats-titre-artiste stats-text">
        <p className="stats-titre">{props.titre}</p>
        <p className="stats-stitre">{props.artiste}</p>
      </div>
    </div>
  );
};

export default Sons;

import React from 'react';
import './Stats.css';

const Genres = (props) => {
  return (
    <div className="stats">
      <p className="stats-classement">{props.index}</p>
      <p className="stats-titre stats-text">{props.nom}</p>
      <p className="stats-stitre">
        {parseFloat(props.pourcent * 100).toFixed(0) + '%'}
      </p>
    </div>
  );
};

export default Genres;

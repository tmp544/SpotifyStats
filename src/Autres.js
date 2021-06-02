import React from 'react';
import './Stats.css';

const Autres = (props) => {
  return (
    <div className="stats">
      <p className="stats-titre stats-text">{props.nom}</p>
      <p className="stats-stitre">
        {parseFloat(props.valeur).toFixed(2)}
      </p>
    </div>
  );
};

export default Autres;

import React, { Component } from 'react';
import Artistes from './Artistes';
import Sons from './Sons';
import Genres from './Genres';
import Autres from './Autres';
import { OPTIONS, TEMPS } from './const';
import './Stats.css';

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      current: OPTIONS['Artistes les plus écoutés'],
    };
  }
  getGenres() {
    const genres = this.props.artistes.reduce((de, artist) => {
      artist.genres.map((genre) => {
        if (de[genre]) {
          de[genre] += 1;
        } else {
          de[genre] = 1;
        }
      });
      return de;
    }, {});

    const sG = Object.keys(genres).sort(
      (a, b) => genres[b] - genres[a]
    );
    let tG = [];
    for (var i = 0; i < Math.min(50, sG.length); i++) {
      tG.push([sG[i], genres[sG[i]]]);
    }
    return tG;
  }

  render() {
    return (
      <div className="stats-ensemble">
        <div className="sidebar-options">
          <select
            id="data-type"
            name="data-type"
            className="stats-select"
            onChange={(e) => {
              this.props.oSelection(e.target.value);
              this.setState({ current: e.target.value });
            }}
          >
            {Object.keys(OPTIONS).map((key) => {
              return (
                <option key={key} value={OPTIONS[key]}>
                  {key}
                </option>
              );
            })}
          </select>
          <p className="stats-separateur">-</p>
          <select
            id="time-range"
            name="time-range"
            className="stats-select"
            onChange={(e) => {
              this.props.tempsSelection(e.target.value);
            }}
          >
            {Object.keys(TEMPS).map((key) => {
              return (
                <option key={key} value={TEMPS[key]}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
        <div className="main-wrapper">
          {this.state.current === OPTIONS['Artistes les plus écoutés'] &&
            this.props.artistes.map((artiste, index) => (
              <Artistes
                nom={artiste.name}
                imageUrl={artiste.images[0].url}
                index={index + 1}
                key={index}
              />
            ))}
          {this.state.current === OPTIONS['Sons les plus écoutés'] &&
            this.props.sons.map((son, index) => (
              <Sons
              titre={son.name}
              imageUrl={son.album.images[0].url}
              artiste={son.artists[0].name}
              index={index + 1}
              key={index}
              />
            ))}
          {this.state.current === OPTIONS['Genres les plus écoutés'] &&
            this.getGenres().map(([genre, score], index) => (
              <Genres
                nom={genre}
                pourcent={score / 50}
                index={index + 1}
                key={index}
              />
            ))}
          {this.state.current === OPTIONS['Autres stats'] &&
            Object.keys(this.props.autres).map((key, index) => (
              <Autres
                nom={key}
                valeur={this.props.autres[key]}
                index={index + 1}
                key={index}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Stats;

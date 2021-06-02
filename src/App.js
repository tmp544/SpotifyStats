import React, { Component } from 'react';
import $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
import Stats from './Stats';
import Sidebar from './Sidebar';
import { OPTIONS, TEMPS, AUTRESSTATS } from './const';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.getInfosUtilisateur = this.getInfosUtilisateur.bind(this);
    this.getArtistes = this.getArtistes.bind(this);
    this.getSons = this.getSons.bind(this);
    this.getAutresStats = this.getAutresStats.bind(this);
    this.state = {
      token: null,
      current: OPTIONS['Artistes les plus écoutés'],
      temps: TEMPS['Dernier mois'],
      artistes: [
        {
          images: [{ url: '' }],
          titre: '',
          genres: [],
        },
      ],
      sons: [
        {
          artistes: [{ nom: '' }],
          nom: '',
          album: { images: [{ url: '' }] },
        },
      ],
      profil: {
        images: [{ url: '' }],
        nomutilisateur: '',
      },
      autres: [{}],
    };

  }
  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getInfosUtilisateur(_token);
      this.getArtistes(_token, this.state.temps);
      this.getSons(_token, this.state.temps);
    }
  }

  defActuel = (type) => {
    this.setState({ current: type });
  };

  defTemps = (range) => {
    this.setState({ temps: range });
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getInfosUtilisateur(_token);
      this.getArtistes(_token, range);
      this.getSons(_token, range);
    }
  };

  getArtistes(token, temps) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${temps}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          artistes: data.items,
        });
      },
    });
  }

  getInfosUtilisateur(token) {
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          profil: data,
        });
      },
    });
  }

  getSons(token, temps) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${temps}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          sons: data.items,
        });
        this.getAutresStats(token);
      },
    });
  }

  getAutresStats(token) {
    const sonsIds = this.state.sons
      .map((titre) => titre.id)
      .reduce((ca, id) => {
        ca += id;
        ca += ',';
        return ca;
      }, '');
    $.ajax({
      url: `https://api.spotify.com/v1/audio-features?ids=${sonsIds}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        let moyenne = {};
        AUTRESSTATS.map((feature) => {
          let total = data.audio_features.reduce((de, it) => {
            de += it[feature];
            return de;
          }, 0);
          moyenne[feature] = total / data.audio_features.length;
        });

        this.setState({
          autres: moyenne,
        });
      },
    });
  }


  render() {
  console.log(this.state.sons);

    if (!this.state.token) {
      return (
        <div className="connexion">
          <div className="acceuil">
            <h1>SpotifyStats</h1>
            <p className="acceuilmsg">
Connexion à l'API de Spotify pour voir les artistes et musiques les plus écoutés            </p>
            <a
              className="bouton bouton--connexionApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}
            >
              Connexion
            </a>

          </div>
        </div>
      );
    }

    return (

      <div className="App">
        <Sidebar profil={this.state.profil} current={this.state.current} />
        <Stats
          oSelection={this.defActuel}
          tempsSelection={this.defTemps}
          artistes={this.state.artistes}
          autres={this.state.autres}
          sons={this.state.sons}
          current={this.state.current}
        />
      </div>
    );
  }
}

export default App;

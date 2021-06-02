//Variables pour la requete GET à l'API
export const OPTIONS = {
  'Artistes les plus écoutés': 'artists',
  'Sons les plus écoutés': 'tracks',
  'Genres les plus écoutés': 'genres',
  'Autres stats': 'moods',
};

export const TEMPS = {
  'Dernier mois': 'short_term',
  'Dans les 6 mois': 'medium_term',
  'Toujours': 'long_term',
};

export const AUTRESSTATS = [
  'acousticness',
  'danceability',
  'duration_ms',
  'energy',
  'instrumentalness',
  'liveness',
  'loudness',
  'mode',
  'speechiness',
  'tempo',
  'valence',
];

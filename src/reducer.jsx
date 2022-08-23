export const initialZikState = {
  user: null,
  myTopTracks: null,
  recentlyPlayed: null,
  myPlaylists: null,
  myTopArtists: null,
  mySavedTracks: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SET_TOP_TRACKS':
      return {
        ...state,
        myTopTracks: action.payload,
      }
    case 'SET_RECENTLY_PLAYED':
      return {
        ...state,
        recentlyPlayed: action.payload,
      }
    case 'SET_MY_PLAYLISTS':
      return {
        ...state,
        myPlaylists: action.payload,
      }
    case 'SET_MY_TOP_ARTISTS':
      return {
        ...state,
        myTopArtists: action.payload,
      }
    case 'SET_MY_SAVED_TRACKS':
      return {
        ...state,
        mySavedTracks: action.payload,
      }
    default:
      return state
  }
}

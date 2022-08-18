export const initialZikState = {
  user: null,
  myTopTracks: null,
  recentlyPlayed: null,
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
    default:
      return state
  }
}

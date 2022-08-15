export const initialZikState = {
  user: null,
  playlists: [],
  playing: false,
}

export const reducer = (state, action) => {

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    default: 
      return state
  }
}
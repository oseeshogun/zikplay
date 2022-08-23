import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import SpotifyWebApi from 'spotify-web-api-js'
import { zikPlayContext } from '../../../contexts'
import TrackItem from '../TrackItem'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, 186px);
  padding: 10px 0;
  padding-bottom: 20vh;
  overflow-y: scroll;
`

const MyArtists = () => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { reducerState, spotify, onSpotifyFailed, dispatch } =
    useContext(zikPlayContext)

  const { myTopArtists } = reducerState

  useEffect(() => {
    spotify
      .getMyTopArtists()
      .then((data) => {
        dispatch({
          type: 'SET_MY_TOP_ARTISTS',
          payload: data.items,
        })
      })
      .catch(onSpotifyFailed)
  }, [])

  return (
    <Container>
      {myTopArtists && myTopArtists.map((artist) => (
        <TrackItem
          track={artist}
          key={artist.uri}
          type="Artiste"
          isArtiste={true}
        />
      ))}
    </Container>
  )
}

export default MyArtists

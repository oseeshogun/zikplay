import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { zipPlayContext } from '../../../contexts'
import SpotifyWebApi from 'spotify-web-api-js'
import TrackItem, { TracksContainer } from './TrackItem'

const Container = styled.div`
  padding: 1rem 0;
`

const MyTopTracks = () => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { reducerState, spotify, onSpotifyFailed, dispatch } =
    useContext(zipPlayContext)

  const { myTopTracks } = reducerState

  useEffect(() => {
    spotify
      .getMyTopTracks({ limit: 5 })
      .then((data) => {
        dispatch({
          type: 'SET_TOP_TRACKS',
          payload: data.items,
        })
      })
      .catch(onSpotifyFailed)
  }, [])

  return (
    <Container>
      <h1>Top Musiques </h1>
      {myTopTracks && (
        <TracksContainer>
          {myTopTracks.map((track) => (
            <TrackItem track={track} key={track.uri} type="Musique" />
          ))}
        </TracksContainer>
      )}
    </Container>
  )
}

export default MyTopTracks

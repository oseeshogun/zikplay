import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { zipPlayContext } from '../../../contexts'
import SpotifyWebApi from 'spotify-web-api-js'
import TrackItem, { TracksContainer } from './TrackItem'
import DisplayElement from '../../Utils/DisplayElement'
import { ClimbingBoxLoader } from 'react-spinners'

const Container = styled.div`
  padding: 1rem 0;
`

const RecentlyPlayedTracks = () => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { reducerState, spotify, onSpotifyFailed, dispatch } =
    useContext(zipPlayContext)

  const { recentlyPlayed } = reducerState

  useEffect(() => {
    spotify
      .getMyRecentlyPlayedTracks({ limit: 10 })
      .then((data) => {
        let tracks = data.items.map((item) => item.track)
        const ids = tracks.map((o) => o.uri)
        const filtered = tracks.filter(
          ({ uri }, index) => !ids.includes(uri, index + 1)
        )
        dispatch({
          type: 'SET_RECENTLY_PLAYED',
          payload: filtered,
        })
      })
      .catch(onSpotifyFailed)
  }, [])

  return (
    <Container>
      <h1>Musiques Récemments Jouées</h1>
      <DisplayElement display={!!recentlyPlayed}>
        <TracksContainer>
          {recentlyPlayed.map((track) => (
            <TrackItem track={track} key={track.uri} type="Musique" />
          ))}
        </TracksContainer>
      </DisplayElement>
      <DisplayElement display={!recentlyPlayed}>
        <ClimbingBoxLoader color="#fff" />
      </DisplayElement>
    </Container>
  )
}

export default RecentlyPlayedTracks

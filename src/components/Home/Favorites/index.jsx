import { useContext, useEffect, useState } from 'react'
import { zikPlayContext } from '../../../contexts'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'
import { RiPlayFill } from 'react-icons/ri'
import { MdQueryBuilder } from 'react-icons/md'
import TrackDetail from '../TrackDetail'
import Spinner from 'react-spinner-material'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 15%;
  padding-bottom: 20vh;

  @media (max-width: 720px) {
    padding: 10px 5%;
    overflow-y: hidden;
  }
`

const PlayIconContainer = styled.div`
  background: #72ffff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 720px) {
    padding: 5px;
  }
`

const FavoritesHeader = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 20px;
  }
`

const TrackListHeader = styled.div`
  color: grey;
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;

  & > *:first-child {
    width: 50%;
  }

  & > *:nth-child(2) {
    width: 30%;
  }

  & > *:nth-child(3) {
    width: 20%;
    text-align: right;
  }

  & h2 {
    font-size: 20px;
  }

  @media (max-width: 720px) {
    & > *:nth-child(2) {
      display: none;
    }

    & > *:first-child {
      width: 70%;
    }
  }
`

const TrackListContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 15vh;
  margin-top: 10px;

  @media (max-width: 720px) {
    padding-bottom: 50vh;
  }
`

const Favorites = () => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { reducerState, setUri, spotify, onSpotifyFailed, dispatch } =
    useContext(zikPlayContext)

  const { mySavedTracks } = reducerState

  const [playingAll, setPlayingAll] = useState(false)

  useEffect(() => {
    spotify
      .getMySavedTracks()
      .then((data) => {
        console.log(data)
        dispatch({
          type: 'SET_MY_SAVED_TRACKS',
          payload: data.items,
        })
      })
      .catch(onSpotifyFailed)
  }, [])

  const playAllSavedTracks = () => {
    setPlayingAll(true)
    const uris = mySavedTracks.map((data) => data.track.uri)
    setUri(uris)
    setTimeout(() => setPlayingAll(false), 3000)
  }

  return (
    <Container>
      <FavoritesHeader>
        {' '}
        <PlayIconContainer onClick={playAllSavedTracks}>
          {!playingAll && <RiPlayFill color="#fff" size={40} />}
          {playingAll && (
            <Spinner radius={30} color={'#fff'} stroke={2} visible={true} />
          )}
        </PlayIconContainer>
        <h1>Musiques Favorites</h1>
      </FavoritesHeader>
      <TrackListHeader>
        <h2>TITRE</h2>
        <h2>ALBUM</h2>
        <h2>
          <MdQueryBuilder />
        </h2>
      </TrackListHeader>
      <TrackListContainer>
        {mySavedTracks &&
          mySavedTracks.map((track, index) => (
            <TrackDetail data={track} count={index + 1} key={track.added_at} />
          ))}
      </TrackListContainer>
    </Container>
  )
}

export default Favorites

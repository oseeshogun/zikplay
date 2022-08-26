import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'
import Spinner from 'react-spinner-material'
import { zikPlayContext } from '../../../../contexts'
import MusicBro from '../../../../assets/svgs/Music_bro.svg'
import TrackItem, { TracksContainer } from '../../components/TrackItem'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlaylistContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 10vh;
  overflow-y: scroll;

  @media (max-width: 720px) {
    padding-bottom: 20vh;
  }
`

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 720px) {
  }
`

const Image = styled.img`
  height: ${(props) => props.imageHeight || '60%'};
`

const CreatePlaylistButton = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  width: 30%;
  font-weight: bold;
  font-size: 1.2rem;
  background: ${(props) => props.color || '#00d7ff'};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  &:hover {
    background: ${(props) => props.hoverColor || '#00b5e2'};
    transform: scale(1.03);
  }
`

const CreatePlaylistInput = styled.input`
  padding: 10px 20px;
  background: transparent;
  border-radius: 20px;
  border: 1px solid white;
  color: white;
  margin: 10px 0;
  width: 30%;

  @media (max-width: 720px) {
    width: 100%;
  }
`

const RadioContainer = styled.div`
  width: 30%;
  padding: 10px 20px;
  display: flex;

  & > input {
    margin-right: 20px;
  }
`

const CreatePlaylistActions = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  & > button {
    width: 100%;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`

const CreatePlaylistPlaceholder = ({ setUserWantNewPlaylist }) => {
  return (
    <Container>
      <Image src={MusicBro} alt="Music bro" />
      <CreatePlaylistButton onClick={() => setUserWantNewPlaylist(true)}>
        Créer un playlist
      </CreatePlaylistButton>
    </Container>
  )
}

const CreatePlaylistForm = ({
  createPlaylist,
  isCreating,
  setUserWantNewPlaylist,
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPucblic] = useState(false)

  return (
    <FormContainer
      onReset={() => setUserWantNewPlaylist(false)}
      onSubmit={(e) => createPlaylist(e, name, description, isPublic, true)}
    >
      <Image src={MusicBro} alt="Music Bro" imageHeight={'30%'} />
      <CreatePlaylistInput
        placeholder="Nom de la playlist"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
        minLength={5}
      />
      <CreatePlaylistInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required={true}
        minLength={10}
      />
      <RadioContainer>
        <input
          type="checkbox"
          id="is_public_checkbox"
          value={isPublic}
          onChange={() => setIsPucblic(!isPublic)}
        />
        <label htmlFor="is_public_checkbox">Publique</label>
      </RadioContainer>
      <CreatePlaylistActions>
        <CreatePlaylistButton type="submit">
          {isCreating ? <Spinner color="white" /> : 'Créer un playlist'}
        </CreatePlaylistButton>
        <CreatePlaylistButton color="red" hoverColor="#8b0000" type="reset">
          Annuler
        </CreatePlaylistButton>
      </CreatePlaylistActions>
    </FormContainer>
  )
}

const MyPlaylist = ({ userWantNewPlaylist, setUserWantNewPlaylist }) => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { reducerState, user, spotify, onSpotifyFailed, dispatch } =
    useContext(zikPlayContext)

  const [isCreating, setIsCreating] = useState(false)

  const { myPlaylists } = reducerState

  const getPlaylists = async (reset = false) => {
    const data = await spotify.getUserPlaylists(user.id)
    dispatch({
      type: 'SET_MY_PLAYLISTS',
      payload: data.items,
    })
    if (reset) setUserWantNewPlaylist(false)
  }

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (user && !loaded) {
      getPlaylists()
        .then(() => {
          setLoaded(true)
        })
        .catch(onSpotifyFailed)
    }
  }, [reducerState])

  const createPlaylist = (e, name, description, isPublic, reset = false) => {
    e.preventDefault()
    setIsCreating(true)
    spotify
      .createPlaylist(user.id, {
        name,
        description,
        public: isPublic,
      })
      .then(() => {
        getPlaylists(reset)
      })
      .catch(onSpotifyFailed)
      .finally(() => setIsCreating(false))
  }

  if (!myPlaylists || myPlaylists.length === 0 || userWantNewPlaylist) {
    if (!userWantNewPlaylist) {
      return (
        <CreatePlaylistPlaceholder
          setUserWantNewPlaylist={setUserWantNewPlaylist}
        />
      )
    }
    return (
      <CreatePlaylistForm
        createPlaylist={createPlaylist}
        isCreating={isCreating}
        setUserWantNewPlaylist={setUserWantNewPlaylist}
      />
    )
  }

  return (
    <PlaylistContainer>
      <TracksContainer>
        {myPlaylists.map((playlist) => (
          <TrackItem track={playlist} key={playlist.id} type="Playlist" />
        ))}
      </TracksContainer>
    </PlaylistContainer>
  )
}

export default MyPlaylist

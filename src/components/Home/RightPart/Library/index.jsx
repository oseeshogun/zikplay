import { useState, useContext } from 'react'
import styled from 'styled-components'
import DisplayElement from '../../../Utils/DisplayElement'
import MyPlaylist from './MyPlaylist'
import MyArtists from './MyArtists'
import { MdAddCircle } from 'react-icons/md'
import { zikPlayContext } from '../../../../contexts'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (max-width: 720px) {
    padding: 10px;
    padding-bottom: 10vh;
  }
`
const Tabs = styled.div`
  display: flex;

  & > *:first-child {
    margin-right: 20px;
  }

  & .create__playlist {
    margin-left: 30px;
  }

  @media (max-width: 720px) {
    flex-direction: column;

    & > *:first-child {
      margin-right: 0;
    }

    & .create__playlist {
      margin-left: 0;
    }

    & > * {
      margin: 10px 0;
    }
  }
`

const Tab = styled.div`
  background: ${(props) => (props.active ? '#00d7ff' : 'transparent')};
  cursor: pointer;
  border: 1px solid #00d7ff;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 30px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background: ${(props) => (props.active ? '#00b5e2' : 'unset')};
  }
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;

  @media (max-width: 720px) {
    margin-top: 0;
  }
`

const Library = () => {
  const [tab, setTab] = useState(0)
  const [userWantNewPlaylist, setUserWantNewPlaylist] = useState(false)

  const isPlaylists = tab === 0
  const isArtists = tab === 1

  const { reducerState } = useContext(zikPlayContext)

  const { myPlaylists } = reducerState

  return (
    <Container>
      <DisplayElement display={!userWantNewPlaylist}>
        <Tabs>
          <Tab active={isPlaylists} onClick={() => setTab(0)}>
            Playlists
          </Tab>
          <Tab active={isArtists} onClick={() => setTab(1)}>
            Artistes
          </Tab>
          {myPlaylists && !isArtists && myPlaylists.length !== 0 && (
            <Tab
              active={true}
              className="create__playlist"
              onClick={() => {
                setUserWantNewPlaylist(true)
                setTab(0)
              }}
            >
              <MdAddCircle style={{ marginRight: '10px' }} />
              <span>Cr??er un playlist</span>
            </Tab>
          )}
        </Tabs>
      </DisplayElement>
      <ContentContainer>
        <DisplayElement display={isPlaylists}>
          <MyPlaylist
            userWantNewPlaylist={userWantNewPlaylist}
            setUserWantNewPlaylist={setUserWantNewPlaylist}
          />
        </DisplayElement>
        <DisplayElement display={isArtists}>
          <MyArtists />
        </DisplayElement>
      </ContentContainer>
    </Container>
  )
}

export default Library

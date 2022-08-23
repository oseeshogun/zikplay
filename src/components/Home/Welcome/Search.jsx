import { useState, useEffect, useContext } from 'react'
import { MdSearch } from 'react-icons/md'
import styled from 'styled-components'
import { zikPlayContext } from '../../../contexts'
import SpotifyWebApi from 'spotify-web-api-js'
import TrackItem, { TracksContainer } from '../TrackItem'
import LoadingItems from './LoadingItems'

const Container = styled.div`
  padding: 1rem 0;
`

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const MdSearchIcon = styled(MdSearch)`
  transform: translateX(30px);
`

const SearchInput = styled.input`
  border-radius: 20px;
  padding: 10px 20px;
  width: 40%;
  border: none;
  padding-left: 40px;

  &:focus {
    outline: 0.5px solid #72ffff;
  }

  @media screen and (max-width: 720px) {
    width: 80%;
  }
`

export const SearchBar = ({ placeholder, search, setSearch }) => {
  return (
    <SearchBarContainer>
      <MdSearchIcon color="grey" />
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        type="text"
      />
    </SearchBarContainer>
  )
}

const SearchSection = styled.div`
  margin: 1rem 0;
`

const Search = ({ search }) => {
  /**
   * @typedef {Object} ZikContext
   * @property {SpotifyWebApi.SpotifyWebApiJs} spotify
   * @property {Array<{}>} myTopTracks
   */

  /** @type {ZikContext} */
  const { spotify, onSpotifyFailed } = useContext(zikPlayContext)

  const [{ albums, artists, playlists, tracks }, setResult] = useState({})

  let prev = null

  useEffect(() => {
    if (prev !== null) {
      prev.abort()
    }
    prev = spotify.search(search, ['track', 'artist', 'album', 'playlist'], {
      limit: 5,
    })
    prev
      .then((data) => {
        setResult({
          albums: data.albums.items,
          artists: data.artists.items,
          playlists: data.playlists.items,
          tracks: data.tracks.items,
        })
        prev = null
      })
      .catch(onSpotifyFailed)
  }, [search])

  return (
    <Container>
      <SearchSection>
        <h1>Musiques</h1>
        {tracks && (
          <TracksContainer>
            {tracks.map((track) => (
              <TrackItem track={track} key={track.uri} type="Musique" />
            ))}
          </TracksContainer>
        )}
        <LoadingItems display={!tracks} />
      </SearchSection>
      <SearchSection>
        <h1>Artistes</h1>
        {artists && (
          <TracksContainer>
            {artists.map((artist) => (
              <TrackItem
                track={artist}
                key={artist.uri}
                type="Artiste"
                isArtiste={true}
              />
            ))}
          </TracksContainer>
        )}
        <LoadingItems display={!artists} />
      </SearchSection>
      <SearchSection>
        <h1>Albums</h1>
        {albums && (
          <TracksContainer>
            {albums.map((album) => (
              <TrackItem track={album} key={album.uri} type="Album" />
            ))}
          </TracksContainer>
        )}
        <LoadingItems display={!albums} />
      </SearchSection>
      <SearchSection>
        <h1>Playlists</h1>
        {playlists && (
          <TracksContainer>
            {playlists.map((playlist) => (
              <TrackItem track={playlist} key={playlist.uri} type="Playlist" />
            ))}
          </TracksContainer>
        )}
        <LoadingItems display={!playlists} />
      </SearchSection>
    </Container>
  )
}

export default Search

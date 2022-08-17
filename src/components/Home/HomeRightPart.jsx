import { useCallback, useContext, useEffect, useState } from 'react'
import { zipPlayContext } from '../../contexts'
import s from '../../styles/HomeRightPart.module.css'
import { MdSearch } from 'react-icons/md'
import SearchGroup from './SearchGroup'
import styled from 'styled-components'

const SearchContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 2%;
  padding-bottom: 30rem;

  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  
  &::-webkit-scrollbar-thumb {
    background: transparent; 
    border-radius:10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {  
    background: #555; 
  }
`

const HomeRightPart = () => {

  const [search, setSearch] = useState('')
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [tracks, setTracks] = useState([])

  const { spotify } = useContext(zipPlayContext)

  let prevSearching = []

  // Artiste Search Hooks
  useEffect(() => {
    if (!search) return;
    // abort previous requests, if any
    for (const prev of prevSearching) {
      if (prev !== null) prev.abort()
    }
    // store the current promise in case we need to abort it
    prevSearching = [
      spotify.searchArtists(search, { limit: 5 }),
      spotify.searchAlbums(search, { limit: 5 }),
      spotify.searchPlaylists(search, { limit: 5 }),
      spotify.searchTracks(search, { limit: 5 }),
    ]
    for (let i = 0; i < prevSearching.length;i++) {
      const prev = prevSearching[i]
       prev.then(
      function(data) {
        // clean the promise so it doesn't call abort
        prevSearching[i] = null
        console.log(data)
        if ('artists' in data) {
           setArtists(data.artists.items) 
        } else if ('albums' in data) {
          setAlbums(data.albums.items)
        } else if ('playlists' in data) {
          setPlaylists(data.playlists.items)
        } else if ('tracks' in data) {
          setTracks(data.tracks.items)
        }
        // ...render list of search results...
      },
      function(err) {
        console.error(err);
      }
    ) 
    }
  }, [search]);

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <MdSearch color="grey" style={{
          position: 'absolute',
          top: '50%',
          zIndex: 3,
          left: '10%',
          transform: 'translateY(-50%)',
        }} />
        <input className={s.searchInput} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Artistes, Albums ou Musiques" />
      </div>
      {search && 
        <SearchContainer>
          <SearchGroup title="Musiques" subtitle="Musique" artists={tracks} />
          <SearchGroup title="Artistes" subtitle="Artiste" artists={artists} />
          <SearchGroup title="Albums" subtitle="Album" artists={albums} />
          <SearchGroup title="Playlists" subtitle="Playlist" artists={playlists} />
        </SearchContainer>
      }
    </div>
  )
}

export default HomeRightPart
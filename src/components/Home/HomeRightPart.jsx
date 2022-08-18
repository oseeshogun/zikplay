import { useCallback, useContext, useEffect, useState } from "react"
import { zipPlayContext } from "../../contexts"
import s from "../../styles/HomeRightPart.module.css"
import { MdSearch } from "react-icons/md"
import SearchGroup from "./SearchGroup"
import styled from "styled-components"
import { ClimbingBoxLoader } from "react-spinners"

const SearchContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 2%;
  padding-bottom: 5rem;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const LoaderContainer = styled.div`
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const HomeRightPart = () => {
  const [search, setSearch] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [tracks, setTracks] = useState([])
  const [recommandations, setRecommandatoins] = useState([])
  const [afrobeats, setAfrobeats] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [topArtists, setTopArtists] = useState([])

  const { spotify } = useContext(zipPlayContext)

  let prevSearching = []

  // Artiste Search Hooks
  useEffect(() => {
    if (!search) return
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
    for (let i = 0; i < prevSearching.length; i++) {
      const prev = prevSearching[i]
      prev.then(
        function (data) {
          // clean the promise so it doesn't call abort
          prevSearching[i] = null
          console.log(data)
          if ("artists" in data) {
            setArtists(data.artists.items)
          } else if ("albums" in data) {
            setAlbums(data.albums.items)
          } else if ("playlists" in data) {
            setPlaylists(data.playlists.items)
          } else if ("tracks" in data) {
            setTracks(data.tracks.items)
          }
          // ...render list of search results...
        },
        function (err) {
          console.error(err)
        }
      )
    }
  }, [search])

  useEffect(() => {
    spotify
      .getRecommendations({
        limit: 5,
        market: "CD",
        seed_genres: "hip-hop",
      })
      .then((data) => {
        if (data.tracks) {
          setRecommandatoins(data.tracks)
        }
      })
      .catch(console.log)
    spotify
      .getRecommendations({
        limit: 5,
        market: "CD",
        seed_genres: "afrobeat",
      })
      .then((data) => {
        if (data.tracks) {
          setAfrobeats(data.tracks)
        }
      })
      .catch(console.log)
    spotify
      .getMyTopTracks({ limit: 5 })
      .then((data) => {
        if (data.items) {
          setTopTracks(data.items)
        }
      })
      .catch(console.log)
    spotify
      .getMyTopArtists({ limit: 5 })
      .then((data) => {
        if (data.items) {
          setTopArtists(data.items)
        }
      })
      .catch(console.log)
  }, [])

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <MdSearch
          color="grey"
          style={{
            position: "absolute",
            top: "50%",
            zIndex: 3,
            left: "10%",
            transform: "translateY(-50%)",
          }}
        />
        <input
          className={s.searchInput}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Artistes, Albums ou Musiques"
        />
      </div>
      {search && (
        <SearchContainer>
          <SearchGroup title="Musiques" subtitle="Musique" artists={tracks} />
          <SearchGroup title="Artistes" subtitle="Artiste" artists={artists} />
          <SearchGroup title="Albums" subtitle="Album" artists={albums} />
          <SearchGroup
            title="Playlists"
            subtitle="Playlist"
            artists={playlists}
          />
        </SearchContainer>
      )}
      {!search && recommandations.length < 0 && (
        <LoaderContainer>
          <ClimbingBoxLoader color="#fff" />
        </LoaderContainer>
      )}
      <SearchContainer>
        {!search && topTracks.length > 0 && (
          <SearchGroup
            title="Top Musiques"
            subtitle="Musique"
            artists={topTracks}
          />
        )}
        {!search && topArtists.length > 0 && (
          <SearchGroup
            title="Top Artistes"
            subtitle="Artiste"
            artists={topArtists}
          />
        )}
        {!search && recommandations.length > 0 && (
          <SearchGroup
            title="Récommandations Hip-Hop"
            subtitle="Musique"
            artists={recommandations}
          />
        )}
        {!search && afrobeats.length > 0 && (
          <SearchGroup
            title="Récommandations Afrobeat"
            subtitle="Musique"
            artists={afrobeats}
          />
        )}
      </SearchContainer>
    </div>
  )
}

export default HomeRightPart

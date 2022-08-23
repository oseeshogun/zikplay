import { useState } from 'react'
import styled from 'styled-components'
import Search, { SearchBar } from './Search'
import DisplayElement from '../../Utils/DisplayElement'
import MyTopTracks from './MyTopTracks'
import RecentlyPlayedTracks from './RecentlyPlayedTracks'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 10vh;
  overflow-y: scroll;
`

const Welcome = () => {
  const [search, setSearch] = useState('')

  return (
    <Container>
      <SearchBar
        setSearch={setSearch}
        search={search}
        placeholder="Musiques, Artistes ou Albums"
      />
      <DisplayElement display={search.trim() !== ''}>
        <Search search={search.trim()} />
      </DisplayElement>
      <DisplayElement display={search.trim() === ''}>
        <RecentlyPlayedTracks />
        <MyTopTracks />
      </DisplayElement>
    </Container>
  )
}

export default Welcome

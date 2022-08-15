import { useCallback, useContext, useEffect, useState } from 'react'
import { zipPlayContext } from '../../contexts'
import s from '../../styles/HomeRightPart.module.css'
import { MdSearch } from 'react-icons/md'
import SearchGroup from './SearchGroup'

const HomeRightPart = () => {

  const [search, setSearch] = useState('')

  const { spotify } = useContext(zipPlayContext)

  let prev = null;

  useEffect(() => {
    if (!search) return;
    // store the current promise in case we need to abort it
    prev = spotify.searchArtists(search, { limit: 5 })
    prev.then(
      function(data) {
        // clean the promise so it doesn't call abort
        prev = null;
        console.log(data)

        // ...render list of search results...
      },
      function(err) {
        console.error(err);
      }
    )
    return () => {
      // abort previous request, if any
      if (prev !== null) {
        prev.abort()
      }
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
        <>
          <SearchGroup title="Artistes" />
        </>
      }
    </div>
  )
}

export default HomeRightPart
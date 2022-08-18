import { MdSearch } from 'react-icons/md'
import styled from 'styled-components'

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
        onChange={(e) => setSearch(e.target.value.trim())}
        placeholder={placeholder}
        type="text"
      />
    </SearchBarContainer>
  )
}

const Search = ({ search, setSearch }) => {}

export default Search

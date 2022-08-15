import s from '../../styles/SearchGroup.module.css'

const SearchGroup = ({ title }) => {
 
  return (
    <div className={s.container}>
      <h1>{title}</h1>
    </div>
  )
}

export default SearchGroup
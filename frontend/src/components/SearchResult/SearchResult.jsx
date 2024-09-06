import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

function SearchResult() {
  const searchResult = useSelector(state => Object.values(state.searchReducer.Result))
  return (
    <div>
      <h1>Your search results...</h1>
      <ul>
      {searchResult.length > 0 ? (
      searchResult.map(result => (
        <li key={result.id}>
          <NavLink to={`/starrednotes/${result.id}`} style={{textDecoration: "none"}}>
          {result.title}
          </NavLink>
        </li>
        ))
    
    ) : (
      <p>No result found...</p>
    )}
      </ul>
    </div>
  )
}

export default SearchResult
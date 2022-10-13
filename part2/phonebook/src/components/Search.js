const Search=({searchTerm,setSearchTerm})=>{
    const handleSearchTerm=(event)=>{
        setSearchTerm(event.target.value)
    }
    return(
        <p>filter shown with a <input value={searchTerm} onChange={handleSearchTerm} /></p>
    )
}
export default Search
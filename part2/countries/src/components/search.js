const Search = ({searchTerm,setSearchTerm})=>{
    const handleSearchTerm = (event)=>{
        setSearchTerm(event.target.value)
        
    }
    return(
        <>
        find countries <input value = {searchTerm}
                        onChange = {handleSearchTerm}/>
        </>
    )

}
export default Search
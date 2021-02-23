export const Filter = ({filter, setFilter}) => {
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    return <input 
        className="filter" 
        placeholder="Search..." 
        type='text' 
        onChange={handleFilter} 
        value={filter}
    />
}
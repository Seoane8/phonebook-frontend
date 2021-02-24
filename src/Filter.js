export const Filter = ({filter, setFilter}) => {
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const style = 'bg-gray-100 placeholder-gray-400 '+
        'sticky top-4 w-10/12 m-auto py-1 px-3 '+
        'outline-none rounded-lg shadow-md '+
        'transition-all duration-400 ease-in-out focus:bg-blue-100 '+
        'md:col-span-3'

    return <input 
        className={style} 
        placeholder="Search..." 
        type='text' 
        onChange={handleFilter} 
        value={filter}
        aria-label="Search contact"
    />
}
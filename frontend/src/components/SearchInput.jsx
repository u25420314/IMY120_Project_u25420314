import {useState} from "react"

function SearchInput() {
    const [searchItem, setSearchItem] = useState("")

    return(
        <div className="search">
            <label htmlFor="search">Search</label>
            <input
                type="text"
                placeholder="Search..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}

            />
        </div>
    )
}

export default SearchInput
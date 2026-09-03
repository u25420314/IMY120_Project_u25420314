import {useState} from "react"

function SearchInput() {
    const [searchItem, setSearchItem] = useState("")

    return(
        <input
            type="text"
            placeholder="Search..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}

        />
    )
}

export default SearchInput
import SearchInput from "../components/SearchInput"
import Feed from "../components/Feed"

function HomePage(){
    return(
        <main>
            <h1>Home Page</h1>
            <SearchInput/>
            <Feed posts ={[]}/>
            
            
        </main>
    )
}


export default HomePage
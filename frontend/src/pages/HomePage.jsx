import SearchInput from "../components/SearchInput"
import Feed from "../components/Feed"
import {dummyPosts} from "../dummyData"

function HomePage(){
    return(
        <main>
            <h1>Home Page</h1>
            <SearchInput/>
            <Feed posts ={dummyPosts}/>
            
            
        </main>
    )
}


export default HomePage
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import SearchInput from "../components/SearchInput"
import Feed from "../components/Feed"
import CreatePost from "../components/CreatePost"
import { getUser } from "../session"


function HomePage(){
    const navigate = useNavigate()
    const [showCreate, setShowCreate] = useState(false)


    if(!getUser()){
        return <Navigate to="/" replace/>
    }
    return(
        <main>
            <h1>Home Page</h1>
            <SearchInput/>

             <button type="button" onClick={() => setShowCreate(!showCreate)}>
                {showCreate ? "Cancel" : "+ New Post"}
            </button>

            {showCreate && <CreatePost onPostCreated={(post) => navigate(`/post/${post._id}`)}/>}
            <Feed />
            
            
        </main>
    )
}


export default HomePage
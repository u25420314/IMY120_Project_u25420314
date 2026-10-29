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
            <div className="page-head">
                <h1 className="page-title">HOME</h1>
                <button type="button" className="btn-solid" onClick={() => setShowCreate(!showCreate)}>
                    {showCreate ? "Cancel" : "+ New Post"}
                </button>
            </div>

            <SearchInput/>

            {showCreate && <CreatePost onPostCreated={(post) => navigate(`/post/${post._id}`)}/>}
            <Feed />
            
        </main>
    )
}


export default HomePage
import { useState } from "react"
import Post from "../components/Post"
import EditPost from "../components/EditPost"
import Comments from "../components/Comments"


function PostPage(){

    const[isEditing, setIsEditing] = useState(false)

    //temp data
    const post ={
        id: 1,
        author : {
            id: 1,
            name: "tempName",
            username: "tempUsername",
            image: ""
        },
        postImage: "",
        caption: "",
        likes: 0

    }



    return(
        <main>
            {isEditing
                ? <EditPost post={post}/>
                : <Post post={post}/>
            }

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "EditPost"}
            </button>
        </main>
    )
}

export default PostPage
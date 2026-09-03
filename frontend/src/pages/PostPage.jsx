import { useState } from "react"
import Post from "../components/Post"
import EditPost from "../components/EditPost"
import Comments from "../components/Comments"
import { dummyPosts, dummyComments } from "../dummyData"


function PostPage(){

    const[isEditing, setIsEditing] = useState(false)

    //temp data
    const post = dummyPosts[0]



    return(
        <main>
            {isEditing
                ? <EditPost post={post}/>
                : <Post post={post}/>
            }

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "EditPost"}
            </button>
            <Comments comments={dummyComments}/>
        </main>
    )
}

export default PostPage
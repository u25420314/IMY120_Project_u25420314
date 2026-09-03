import {Link} from "react-router-dom"
import ProfilePreview from "./ProfilePreview"

function PostPreview({ post }){
    return(
        <div className="preview-card">
            <ProfilePreview profile={post.author}/>

            <Link to={`/post/${post.id}`}>
                <img src={post.postImage}/>
                <p>{post.caption}</p>

                <p>{post.likes} likes</p>
                <p>{post.commentsCount} comments</p>
            </Link>
        </div>
    )
}

export default PostPreview
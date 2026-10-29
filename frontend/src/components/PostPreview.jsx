import {Link} from "react-router-dom"
import ProfilePreview from "./ProfilePreview"
import Hashtags from "./Hashtags"

const COMMENTS_IN_FEED = 2

function PostPreview({ post}){
    const author = {_id: post.userId, username: post.username}


    const comments = post.comments || []
    const latestComments = comments.slice(-COMMENTS_IN_FEED)


    return(
        <div className="preview-card">
            <ProfilePreview profile={author}/>
            <p>{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</p>

            <Link to={`/post/${post.id}`}>
                {post.imageUrl && <img src={post.imageUrl} alt ={post.caption}/>}
                <p>{post.caption}</p>

            </Link>


            <Hashtags tags={post.hashtags}/>



            {latestComments.length > 0 && (
                <div>
                    {latestComments.map((comment) => (
                        <p key = {comment.commentId}><strong>{comment.username}: </strong>{comment.text}</p>
                    ))}
                </div>
            )}

            <Link to={`/post/${post._id}`}>
                {comments.length > COMMENTS_IN_FEED
                    ? `View all ${comments.length} comments`
                    : `${comments.length} comments`}
            </Link>
        
        </div>
    )
}

export default PostPreview
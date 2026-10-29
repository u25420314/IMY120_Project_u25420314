import {Link} from "react-router-dom"
import ProfilePreview from "./ProfilePreview"
import Hashtags from "./Hashtags"

const COMMENTS_IN_FEED = 2

function PostPreview({ post}){
    const author = {_id: post.userId, username: post.username}


    const comments = post.comments || []
    const latestComments = comments.slice(-COMMENTS_IN_FEED)


    return(
        <article className="post-card">
            <header className="post-card-header">
                <ProfilePreview profile={author}/>
                <time className="post-date" dateTime={post.createdAt}>
                    {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
                </time>
            </header>

            <Link to={`/post/${post._id}`} className="post-card-image">
                {post.imageUrl && <img src={post.imageUrl} alt={post.caption}/>}
            </Link>

            <div className="post-card-body">
                <p className="post-caption">{post.caption}</p>

                <Hashtags tags={post.hashtags}/>

                {latestComments.length > 0 && (
                    <div className="post-comments">
                        {latestComments.map((comment) => (
                            <p key={comment.commentId}><strong>{comment.username}</strong> {comment.text}</p>
                        ))}
                    </div>
                )}

                <Link to={`/post/${post._id}`} className="post-comments-link">
                    {comments.length > COMMENTS_IN_FEED
                        ? `View all ${comments.length} comments`
                        : `${comments.length} comments`}
                </Link>
            </div>
        </article>
    )
}

export default PostPreview
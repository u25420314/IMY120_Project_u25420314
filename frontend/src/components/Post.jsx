import Image from "./Image";
import ProfilePreview from "./ProfilePreview";
import Hashtags from "./Hashtags"

function Post({ post}){
    return (

        <article className="post-full">
            <header className="post-full-header">
                <time className="post-date" dateTime={post.createdAt}>
                    {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
                </time>
                <ProfilePreview profile={{ _id: post.userId, username: post.username }}/>
            </header>

            {post.imageUrl && <Image className="post-full-image" src={post.imageUrl} alt={post.caption}/>}

            <div className="post-full-body">
                <p className="post-caption"><strong>Caption:</strong> {post.caption}</p>
                <Hashtags tags={post.hashtags}/>

                {/* the albums only show on the post page, not in the feed */}
                {post.albums?.length > 0 && (
                    <p className="post-albums">In album{post.albums.length > 1 ? "s" : ""}: {post.albums.map((album) => album.name).join(", ")}</p>
                )}
            </div>
        </article>
    )
}

export default Post
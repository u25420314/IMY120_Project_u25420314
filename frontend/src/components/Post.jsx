import Image from "./Image";
import ProfilePreview from "./ProfilePreview";
import Hashtags from "./Hashtags"

function Post({ post}){
    return (

        <article>
            <ProfilePreview profile={{_id: post.userId, username: post.username}}/>
            <p>{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</p>
            

            {post.imageUrl && <Image src={post.imageUrl} alt={post.caption}/>}

            <p>{post.caption}</p>
            <Hashtags tags={post.hashtags}/>
            

            {post.albums?.length > 0 && (
                <p>In album{post.albums.length > 1 ? "s" : ""}: {post.albums.map((album) => album.name).join(", ")}</p>
            )}
        </article>
    )
}

export default Post
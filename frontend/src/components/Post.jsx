import Image from "./Image";
import ProfilePreview from "./ProfilePreview";

function Post({ post}){
    return (
        <div>
            <ProfilePreview profile={post.author}/>
            <Image src={post.postImage} alt={post.caption}/>

            <p>{post.caption}</p>
            <p>{post.likes}</p>
        </div>
    )
}

export default Post
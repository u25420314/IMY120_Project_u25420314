import PostPreview from "./PostPreview"

function UserPosts({ posts }){
        return (

        <div>
            <h2>Posts</h2>
            {posts.map((post) => (
                <PostPreview key={post.id} post={post}/>
            ))}
        </div>
    )
}



export default UserPosts
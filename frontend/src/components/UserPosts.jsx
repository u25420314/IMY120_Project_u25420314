import { Link } from "react-router-dom"
const PLACEHOLDER = "https://placehold.co/300"
import PostPreview from "./PostPreview"

function UserPosts({ posts }){
        return (

        <section>
            <h2>Posts ({posts.length})</h2>
            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                <div className="post-grid">
                    {posts.map((post) => (
                        <Link key={post._id} to={`/post/${post._id}`}>
                            <img src={post.imageUrl || PLACEHOLDER} alt={post.caption}/>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}



export default UserPosts
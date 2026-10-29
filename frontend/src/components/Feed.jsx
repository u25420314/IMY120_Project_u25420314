import PostPreview from "./PostPreview"
import { useState, useEffect } from 'react';
import { API_URL } from "../config";
import { getUser } from "../session"
import { useSearchParams } from "react-router-dom"

function Feed() {

    const currentUser = getUser()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [scope, setScope ] = useState(currentUser ? "local" : "global")
    const [sort, setSort] = useState("newest")
    const [searchParams, setSearchParams] = useSearchParams()
    const hashtag = searchParams.get("hashtag") || ""

    const fetchPosts = async () => {
        setLoading(true)
        setError("")
        try{
            const params = new URLSearchParams({ scope, sort})
            if(currentUser?._id){
              params.set("userId", currentUser._id)
            }
            if(hashtag){
              params.set("hashtag", hashtag)
            }
            const response = await fetch(`${API_URL}/api/posts?${params.toString()}`);
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Failed to fetch posts")
            }

            setPosts(data)
        }catch(err){
            console.error('Error fetching posts:', err);
            setError(err.message || 'Could not load posts.');
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [scope, sort, hashtag])

    return (
        <section className="feed" aria-label="Activity feed">
            <div className="feed-controls">
                <div className="feed-tabs">
                    <button type="button" className={`feed-tab ${scope === "local" ? "active" : ""}`} onClick={() => setScope("local")}>LOCAL</button>
                    <button type="button" className={`feed-tab ${scope === "global" ? "active" : ""}`} onClick={() => setScope("global")}>GLOBAL</button>
                </div>

                <div className="feed-sort">
                    <label htmlFor="sort">Sort by</label>
                    <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="comments">Most commented</option>
                    </select>
                </div>
            </div>

            {hashtag && (
                <button type="button" className="filter-chip" onClick={() => setSearchParams({})}>#{hashtag} ✕</button>
            )}

            {loading && <p className="empty">Loading feed...</p>}

            {!loading && error && <p role="alert">{error}</p>}

            {!loading && !error && posts.length === 0 && (
                <p className="empty">No posts here yet.</p>
            )}

            {!loading && !error && posts.length > 0 && (
                <div className="feed-list">
                    {posts.map((post) => (
                        <PostPreview key={post._id} post={post}/>
                    ))}
                </div>
            )}
        </section>
    )

    
}

export default Feed

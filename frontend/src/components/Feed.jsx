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

    if(loading){
        return(
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-black font-semibold">Loading feed...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="p-3 bg-red-500/20 border border-red-500 text-red-900 text-xs rounded">{error}</p>
            </div>
    );
  }

  // return(
  //   <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-4">
  //       <h2 className="text-2xl font-black text-black mb-2">Feed</h2>

  //       {posts.length === 0 ? (
  //       <div className="bg-white/20 p-6 rounded-xl shadow-md w-full text-center backdrop-blur-sm border border-white/30">
  //         <p className="text-black/80">No posts yet. Be the first to share something!</p>
  //       </div>
  //       ) : (

  //       posts.map((post) => (
  //       <div 
  //           key={post._id} 
  //           className="bg-white/20 p-6 rounded-xl shadow-md w-full backdrop-blur-sm border border-white/30 flex flex-col gap-3"
  //       >
            
  //           <div className="flex items-center justify-between">
  //             <span className="font-bold text-black">@{post.username || 'Anonymous'}</span>
  //             <span className="text-xs text-black/60">
  //               {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
  //             </span>
  //           </div>

            
  //           {post.imageUrl && (
  //             <img 
  //               src={post.imageUrl} 
  //               alt="Post content" 
  //               className="rounded-lg w-full max-h-96 object-cover border border-white/20"
  //             />
  //           )}

            
  //           <p className="text-black text-sm whitespace-pre-wrap">{post.caption}</p>

            
  //           {post.hashtags && post.hashtags.length > 0 && (
  //             <div className="flex flex-wrap gap-2 text-xs font-semibold text-black/70">
  //               {post.hashtags.map((tag, index) => (
  //                 <span key={index}>{tag.startsWith('#') ? tag : `#${tag}`}</span>
  //               ))}
  //             </div>
  //           )}

            
  //           <div className="flex justify-between items-center text-xs text-black/80 pt-2 border-t border-black/10 mt-1">
  //             <span>{post.likes?.length || 0} Likes</span>
  //             <span>{post.comments?.length || 0} Comments</span>
  //           </div>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // )

  return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-black text-black mb-2">Feed</h2>

            {/* scope toggle + sort */}
            <div className="flex justify-between w-full">
                <div className="flex gap-2">
                    <button onClick={() => setScope("local")} className={scope === "local" ? "font-bold underline" : ""}>Local</button>
                    <button onClick={() => setScope("global")} className={scope === "global" ? "font-bold underline" : ""}>Global</button>
                </div>
                <label htmlFor="sort">Sort by </label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="comments">Most commented</option>
                </select>
            </div>

            {hashtag && (
                <button onClick={() => setSearchParams({})}>#{hashtag} ✕ clear filter</button>
            )}

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <PostPreview
                        key={post._id}
                        post={post}
                        
                    />
                ))
            )}
        </div>
    )

    
}

export default Feed

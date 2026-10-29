import { useState, useEffect } from "react"
import { useParams, useNavigate, Navigate} from "react-router-dom"
import Post from "../components/Post"
import EditPost from "../components/EditPost"
import Comments from "../components/Comments"
import {API_URL} from "../config"
import { getUser } from "../session"

function PostPage(){

    const { id } = useParams()
    const navigate = useNavigate()
    const currentUser = getUser()

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionError, setActionError] = useState("")
    const[isEditing, setIsEditing] = useState(false)
    const [confirmingDelete, setConfirmingDelete] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            setError("")

            try{
                const response = await fetch(`${API_URL}/api/posts/${id}`)
                const data = await response.json()

                if(!response.ok){
                    throw new Error(data.error || "Failed to load post")
                }

                setPost(data)

            }catch(err){
                setError(err.message | "Could not load post")
            }finally{
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    const handleDelete = async () => {
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/api/posts/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                boyd: JSON.stringify({userId: currentUser?._id})
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Failed to delete post")
            }

            navigate("/home")

        } catch (err) {
            setActionError(err.message || "Something went wrong")
            setConfirmingDelete(false)
        }
    }

    if(!currentUser){
        return <Navigate to="/" replace/>
    }

    if(loading){
        return <main><p>Loading post...</p></main>
    }

    if(error){
        return <main><p role="alert">{error}</p></main>
    }

    const canManage = post.userId?.toString() === currentUser._id || currentUser.role === "admin"



    return(
        <main>

            <button type="button" onClick={() => navigate(-1)}>← Back</button>
            {isEditing
                ? <EditPost 
                    post={post}
                    onSaved={(updated) => {
                        setPost((prev) => ({ ...prev, ...updated }))
                        setIsEditing(false)
                    }}
                    onCancel={() => setIsEditing(false)}
                />
                : <Post post={post}/>
            }

            {canManage ** !isEditing && (
                <div>
                    <button type="button" onClick={() => setIsEditing(true)}>Edit post</button>

                    {confirmingDelete ? (
                        <>
                            <span>Delete this post and all its comments?</span>
                            <button type="button" onClick={handleDelete}>Yes, delete</button>
                            <button type="button" onClick={() => setConfirmingDelete(false)}>Cancel</button>
                        </>
                    ) : (
                        <button type="button" onClick={() => setConfirmingDelete(true)}>Delete Post</button>
                    )}
                </div>
            )}

            {actionError && <p role="alert">{actionError}</p>}

            <Comments
                postId={post._id}
                comments={post.comments || []}
                onCommentAdded={(comment) =>
                    setPost((prev) => ({...prev, comments: [...(prev.comments || []), comment]}))
                }
            />
        </main>
    )
}

export default PostPage
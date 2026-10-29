import { useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../session"

function Comments({ postId, comments, onCommentAdded}) {
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!text.trim()){
            setError("Write something first")
            return
        }

        const user = getUser()
        setError("")
        setSending(true)

        try{
            const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ userId: user?._idm ,username: user?.username, text})
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Failed to add comment")
            }

            onCommentAdded(data)
            setText("")
        }catch(err){
            setError(err.message || "Something went wrong")
        }finally{
            setSending(false)
        }
    }

    return(
        <section>
            <h2>Comments ({comments.length})</h2>

            {comments.length === 0 && <p>No Comment yet</p>}

            {comments.map((comment) => (
                <p key={comment.commentId}> <strong>{comment.username}: </strong>{comment.text}</p>
            ))}

            <form onSubmit={handleSubmit}>
                {error && <p role = "alert">{error}</p>}
                <label htmlFor="commentText">Add a comment</label>
                <input

                    type="text"
                    id="commentText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Pleeas leave a comment..."
                />

                <button type="submit" disabled={sending}>{sending ? "Posting..." : "Post"}</button>



            </form>
        </section>
    )
}




export default Comments
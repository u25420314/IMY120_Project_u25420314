import {useState} from "react"
import { API_URL } from "../config"
import { getUser } from "../session"
import { parseHashtags } from "../utils/hashtags"


function EditPost({ post, onSaved, onCancel }){
    const [caption, setCaption] = useState(post.caption)
    const [hashtagsInput, setHashtagsInput ] = useState((post.hashtags || []).join(" "))
    const [error, setError ] = useState("")
    const [saving, setSaving ] = useState(false)


    const  handleSubmit = async (event) =>{
        event.preventDefault()

        if (!caption.trim()) {
            setError("Caption is required")
            return
        }

        setError("")
        setSaving(true)

        try {
            const response = await fetch(`${API_URL}/api/posts/${post._id}`, {
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify ({
                    caption,
                    hashtags: parseHashtags(hashtagsInput),
                    userIdL: getUser()?._id
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Failed to update post")
            }

            onSaved(data)
        } catch (err) {
            setError(err.message || "Something went wrong")

        }finally{
            setSaving(false)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="panel">
            <h2>Edit Post</h2>

            {post.imageUrl && <img className="preview-image" src={post.imageUrl} alt={post.caption}/>}

            {error && <p role="alert">{error}</p>}

            <div>
                <label htmlFor="editCaption">Caption</label>

                <textarea
                    id="editCaption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Edit Caption..."
                />
            </div>

            <div>
                <label htmlFor="editHashtags">Hashtags</label>
                <input
                    type="text"
                    id="editHashtags"
                    value={hashtagsInput}
                    onChange={(e) => setHashtagsInput(e.target.value)}
                    placeholder="#movie #flick"
                />
            </div>

            <div className="post-actions">
                <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>



        </form>
    )
}

export default EditPost
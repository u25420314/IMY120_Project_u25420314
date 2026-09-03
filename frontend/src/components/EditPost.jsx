import {useState} from "react"

function EditPost({ post }){
    const [caption, setCaption] = useState(post.caption)


    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>

            <label htmlFor="cpation">Caption</label>
            <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Edit Caption..."
            />

            <button type="submit">Save Changes</button>



        </form>
    )
}

export default EditPost
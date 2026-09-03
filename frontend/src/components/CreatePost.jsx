import {useState} from "react"

function CreatePost(){
    const [postImage, setPostImage] = useState("")
    const [caption, setCaption] = useState("")

    function handleSubmit(event){
        event.preventDefault()


    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="postImage">Upload Image</label>
            <input type="file" id="postImage" accept="image/*"/>

            <label htmlFor="caption">Caption</label>
            <textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)}/>


            <button type="submit">Post</button>
        </form>
    )
}

export default CreatePost
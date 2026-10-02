import {useState} from "react"
import { currentUser } from "../dummyData"

function CreatePost({ currentUser, onPostCreated}){
    const [imageUrl, setImageUrl] = useState("")
    const [caption, setCaption] = useState("")
    const [hashtagsInput, setHashtagsInput] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (event) =>{
        event.preventDefault()
        setError('');

        if(!caption.trim()){
            setError('Caption is required')
            return
        }

        const hashtags = hashtagsInput
            .split(/[\s,]+/)
            .filter((tag) => tag.length > 0)
            .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`))
        

        setLoading(true)

        try{
            const response = await fetch('http://localhost:3000/api/posts', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    userId: currentUser?._id,
                    username: currentUser?.username,
                    caption,
                    imageUrl,
                    hashtags
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Failed to create post")
            }

            console.log("Post created successfully")

            setCaption('')
            setImageUrl('')
            setHashtagsInput('')

            if(onPostCreated){
                onPostCreated(data)
            }
        }catch(err){
            console.error('Error creating post', err);
            setError(err.message || "Something went wrong")
        }finally{
            setLoading(false)
        }


    }

    return (

        <div className="bg-white/20 p-6 rounded-xl shadow-md w-full max-w-lg backdrop-blur-sm border border-white/30">
            <h2 className="text-xl font-bold text-black mb-4">Create a Post</h2>
            {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-900 text-xs rounded">
                {error}
            </div>
      )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="postImage">Upload Image</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            
                <div>
                    <label htmlFor="caption" className="block text-sm font-semibold text-black mb-1">Caption</label>
                    <textarea
                        id="caption" 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-black mb-1">Hashtags (Optional)</label>
                    <input
                        type="text"
                        value={hashtagsInput}
                        onChange={(e) => setHashtagsInput(e.target.value)}
                        placeholder="movie, flick, lifestyle"
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            
            


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 mt-2"
                    >
                    {loading ? 'PUBLISHING...' : 'PUBLISH POST'}
                </button>
            </form>
        </div>
        
    )
}

export default CreatePost
import { useEffect } from "react";
import { useState } from "react";

function EditProfile({ currentUser, onProfileUpdated }){


    const [username, setUsername] = useState(currentUser?.username || "")
    const [bio, setBio] = useState(currentUser?.bio || '')
    const [profilePicture, setProfilePicture] = useState(currentUser?.profilePicture || '')
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(currentUser){
            setUsername(currentUser.username || '')
        setBio(currentUser.bio || '')
        setProfilePicture(currentUser.profilePicture || '')
        }
        
    }, [currentUser])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setSuccessMessage('')

        if(!currentUser?._id){
            setError("User ID not found, please login again")
            return
        }

        setLoading(true)
    

    try{
        const response = await fetch(`http://localhost:3000/api/users/${currentUser._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                bio,
                profilePicture
            })
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.error || "Failed to update profile")
        }

        if(onProfileUpdated){
            onProfileUpdated({ ...currentUser, username, bio, profilePicture})
        }
    }catch(err){
        console.error('Error updating profile:', err);
        setError(err.message || 'Something went wrong');
    }finally{
        setLoading(false)
    }
}


    return(

        <div className="bg-white/20 p-8 rounded-xl shadow-md w-full max-w-md backdrop-blur-sm border border-white/30">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Edit Profile</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-900 text-xs rounded">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-900 text-xs rounded">
                    {successMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                
                <div className="flex flex-col gap-4">
                    <label htmlFor="username" className="block text-sm font-semibold text-black mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Change Username..."
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="bio" className="block text-sm font-semibold text-black mb-1">Bio </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Change Bio..."
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>


                <div className="flex flex-col gap-4">
                    <label htmlFor="image" className="block text-sm font-semibold text-black mb-1">Change Profile Photo</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    
                    />
                </div>
                
            
               <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 mt-2"
                    >
                    {loading ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
            </form> 
        </div>
        
    )
}

export default EditProfile
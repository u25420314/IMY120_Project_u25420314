import { useState } from "react";

function EditProfile({ profile }){


    const [name, setName] = useState(profile.name)
    const [username, setUsername] = useState(profile.username)
    const [bio, setBio] = useState(profile.bio)
    const [image, setImage] = useState(profile.image)

    function handleSubmit(event){
        event.preventDefault()
    }


    return(
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            <label htmlFor="image">Change Profile Photo</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.value)}
               
            />


            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Change Name..."
            />

            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Change Username..."
            />

            <label htmlFor="bio">Bio</label>
            <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Change Bio..."
            />


            <button type="submit">Save Changes</button>
        </form>
    )
}

export default EditProfile
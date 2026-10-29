import { Link } from "react-router-dom"

const PLACEHOLDER = "https://placehold.co/100"

function ProfilePreview({ profile }){

    if(!profile) return null

    const id = profile._id || profile.id
    const image = profile.profilePicture || profile.profileImage || PLACEHOLDER

    const content = (
        <>
            <img src={image} alt={`${profile.username}'s profile picture`}/>
            {profile.name && <h3>{profile.name}</h3>}
            <p>@{profile.username}</p>
        </>
    )
    return (
        <div className="preview-card">
            {id ? <Link to={`/profile/${id}`}>{content}</Link> : content}
        </div>
    )
}

export default ProfilePreview
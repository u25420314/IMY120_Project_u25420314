import { Link } from "react-router-dom"

const PLACEHOLDER = "https://placehold.co/100"

function ProfilePreview({ profile }){

    if(!profile) return null

    const id = profile._id || profile.id
    const image = profile.profilePicture || profile.profileImage || PLACEHOLDER

    const content = (
        <>
            <img className="avatar" src={image} alt={`${profile.username}'s profile picture`}/>
            <p>{profile.username}</p>
        </>
    )
    return (
        <div className="profile-chip">
            {id ? <Link to={`/profile/${id}`}>{content}</Link> :<div>{content}</div>}
        </div>
    )
}

export default ProfilePreview
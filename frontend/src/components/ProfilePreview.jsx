import { Link } from "react-router-dom"

function ProfilePreview({ profile }){
    return (
        <div className="preview-card">
            <Link to={`/profile/${profile.id}`}>
                <img src={profile.profileImage} alt="ProfileImage"/>

                <h3>{profile.name}</h3>
                <p>@{profile.username}</p>
            </Link>
        </div>
    )
}

export default ProfilePreview
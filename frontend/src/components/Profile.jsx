const PLACEHOLDER = "https://placehold.co/150"

function Profile ({ profile, showDetails }){
    

    return(
        <div>
            <img src={profile.profilePicture || PLACEHOLDER} alt={`${profile.username}'s profile picture`}/>
            <h1>@{profile.username}</h1>
            {showDetails && profile.bio && <p>{profile.bio}</p>}


        </div>
        
    )
}

export default Profile
const PLACEHOLDER = "https://placehold.co/150"

function Profile ({ profile, showDetails, children }){
    

    return(
        <section className="profile-header">
            <div className="profile-info">
                <h1>@{profile.username}</h1>
                {showDetails && profile.bio && <p className="profile-bio">{profile.bio}</p>}
                <div className="profile-buttons">{children}</div>

            </div>

             <img className="profile-picture" src={profile.profilePicture || PLACEHOLDER} alt={`${profile.username}'s profile picture`}/>
        </section>
        
    )
}

export default Profile
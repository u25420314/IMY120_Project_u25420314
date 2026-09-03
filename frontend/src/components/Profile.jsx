function Profile ({ profile }){
    

    return(
        <div>
            <img src={profile.image} alt="Profile Photo"/>
            <h1>{profile.name}</h1>
            <p>@{profile.username}</p>
            <p>{profile.bio}</p>


        </div>
        
    )
}

export default Profile
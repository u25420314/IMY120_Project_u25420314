import { useState } from "react"
import Profile from "../components/Profile"
import EditProfile from "../components/EditProfile"
import UserPosts from "../components/UserPosts"
import FriendsList from "../components/FriendsList"
import CreatePost from "../components/CreatePost"

function ProfilePage(){

    const [isEditing, setIsEditing] = useState(false)

    //mock data
    const profile ={

        id: 1,
        name: "test",
        username: "testUsername",
        bio: "This is a bio",
        image: ""
    }


    return(
        <main>
            {isEditing
                ? <EditProfile profile={profile}/>
                : <Profile profile={profile}/>
            }

            <button onClick={() =>setIsEditing(!isEditing)}> {isEditing ? "Cancel" : "Edit Profile"}</button>

            <CreatePost/>
            <UserPosts posts ={[]}/>
            <FriendsList friends={[]}/>

            
        </main>
        
    )
}

export default ProfilePage
import { useState, useEffect } from "react"
import { useParams, Navigate } from "react-router-dom"
import Profile from "../components/Profile"
import EditProfile from "../components/EditProfile"
import FriendActions from "../components/FriendActions"
import FriendRequests from "../components/FriendRequests"
import FriendsList from "../components/FriendsList"
import UserAlbums from "../components/UserAlbums"
import UserPosts from "../components/UserPosts"
import { getUser, saveUser } from "../session"
import { apiRequest } from "../utils/api"

function ProfilePage(){

    const { id } = useParams()
    
    const [me, setMe] = useState(getUser())
    const [myData, setMyData] = useState(null)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [albums, setAlbums] = useState([])
    const [connections, setConnections] = useState({ friends: [], requests: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionError, setActionError] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [reloadKey, setReloadKey] = useState(0) 


    useEffect(() => {
        if(!me){
            return
        }

        const loadProfile = async () => {
            setError("")

            try{
                const [user, freshMe, userPosts, userAlbums, userConnections] = await Promise.all([
                    apiRequest(`/api/users/${id}`),
                    apiRequest(`/api/users/${me._id}`),
                    apiRequest(`/api/posts?author=${id}`),
                    apiRequest(`/api/albums?userId=${id}`),
                    apiRequest(`/api/users/${id}/connections`)
                ])

                setProfile(user)
                setMyData(freshMe)
                setPosts(userPosts)
                setAlbums(userAlbums)
                setConnections(userConnections)
            }catch(err){
                setError(err.message || " Could not load profile")
            }finally{
                setLoading(false)
            }

        }

        loadProfile()
    }, [id, me, reloadKey])


    const FriendAction = async ( path, body) => {
        setActionError("")

        try{
            await apiRequest(path, "POST", body)
            setReloadKey((key) => key + 1)
        }catch(err){
            setActionError(err.message)
        }
    }

    if(!me){
        return <Navigate to="/" replace/>
    }

    if(loading){
        return <main><p>Loading profile...</p></main>
    }

    if(error){
        return <main><p role="alert">{error}</p></main>
    }

    const isOwnProfile = id === me._id
    const isFriend = (profile.friends || []).map(String).includes(me._id)
    const requestSent = (profile.friendRequests || []).map(String).includes(me._id)
    const requestReceived = (myData?.friendRequests || []).map(String).includes(id)

    let friendStatus = "none"
    if(isFriend) friendStatus = "friends"
    else if(requestReceived) friendStatus = "received"
    else if(requestSent) friendStatus = "sent"

    const canSeeEverything = isOwnProfile || isFriend || me.role === "admin"

    return(
        <main>
            {isEditing
                ? <EditProfile
                    currentUser={me}
                    onProfileUpdated={(updated) => {
                        saveUser(updated)
                        setMe(updated)
                        setIsEditing(false)
                    }}
                    onCancel={() => setIsEditing(false)}
                  />
                : (
                    <Profile profile={profile} showDetails={canSeeEverything}>
                        {isOwnProfile ? (
                            <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        ) : (
                            <FriendActions
                                status={friendStatus}
                                onAdd={() => friendAction("/api/users/friend-request", { senderId: me._id, recieverId: id })}
                                onAccept={() => friendAction("/api/users/accept-friend", { userId: me._id, friendId: id })}
                                onDecline={() => friendAction("/api/users/decline-friend", { userId: me._id, friendId: id })}
                                onUnfriend={() => friendAction("/api/users/unfriend", { userId: me._id, friendId: id })}
                            />
                        )}
                    </Profile>
                )
            }

            {actionError && <p role="alert">{actionError}</p>}

            {canSeeEverything ? (
                <>
                    {isOwnProfile && (
                        <FriendRequests
                            requests={connections.requests}
                            onAccept={(friendId) => friendAction("/api/users/accept-friend", { userId: me._id, friendId })}
                            onDecline={(friendId) => friendAction("/api/users/decline-friend", { userId: me._id, friendId })}
                        />
                    )}
                    <FriendsList friends={connections.friends}/>
                    <UserAlbums albums={albums}/>
                    <UserPosts posts={posts}/>
                </>
            ) : (
                <p className="locked">Become friends with {profile.username} to see their posts, albums and friends.</p>
            )}
        </main>
        
    )
}

export default ProfilePage
import ProfilePreview from "./ProfilePreview";

function FriendsList({ friends }){

    return(
        <div>

            <h2>Friends</h2>
            {friends.map((friend) => (
                <ProfilePreview key={friend.id} profile={friend}/>
            ))}
        </div>
    )
}

export default FriendsList
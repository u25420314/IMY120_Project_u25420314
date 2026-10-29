import ProfilePreview from "./ProfilePreview";

function FriendsList({ friends }){

    return(
        <section>
            <h2>Friends ({friends.length})</h2>

            {friends.length === 0 && <p>No friends yet.</p>}

            {friends.map((friend) => (
                <ProfilePreview key={friend._id} profile={friend}/>
            ))}
        </section>
    )
}

export default FriendsList
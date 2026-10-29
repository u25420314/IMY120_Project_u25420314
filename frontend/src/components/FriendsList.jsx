import ProfilePreview from "./ProfilePreview";

function FriendsList({ friends }){

    return(
        <section>
            <h2>Friends ({friends.length})</h2>

            {friends.length === 0 && <p className="empty">No friends yet.</p>}

            <div className="friends-row">
                {friends.map((friend) => (
                    <ProfilePreview key={friend._id} profile={friend}/>
                ))}
            </div>
        </section>
    )
}

export default FriendsList
import ProfilePreview from "./ProfilePreview";

function FriendRequests({ requests, onAccpet, onDecline}){
    if(requests.length === 0){
        return null
    }

    return (
        <section>
            <h2>Friend Requests ({requests.length})</h2>
            {requests.map((person) => (
                <div key={person._id}>
                    <ProfilePreview profile={person}/>
                    <button type="button" onClick={() => onAccept(person._id)}>Accept</button>
                    <button type="button" onClick={() => onDecline(person._id)}>Decline</button>
                </div>
            ))}
        </section>

    )
}

export default FriendRequests
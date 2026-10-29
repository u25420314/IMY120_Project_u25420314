function FriendActions({ status, onAdd, onAccpet, onDecline, onUnfriend}){
    if(status === "friends"){
        return (
            <div>
                <span>✓ Friends</span>
                <button type="button" onClick={onUnfriend}>Unfriend</button>
            </div>
        )
    }

    if(status === "sent"){
        return (
            <div>
                <span>Friend request pending</span>
            </div>
        )
    }

    if(status === "received"){
        return (
            <div>
                <span>Wants to be your friend</span>
                <button type="button" onClick={onAccept}>Accept</button>
                <button type="button" onClick={onDecline}>Decline</button>
            </div>
        )
    }

    return (
        <div>
            <span>Not friends</span>
            <button type="button" onClick={onAdd}>Add friend</button>
        </div>
    )
}

export default FriendActions
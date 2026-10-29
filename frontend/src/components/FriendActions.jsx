function FriendActions({ status, onAdd, onAccpet, onDecline, onUnfriend}){
    if(status === "friends"){
        return (
            <div>
                <span className="status-badge">Friends</span>
                <button type="button" onClick={onUnfriend}>Unfriend</button>
            </div>
        )
    }

    if(status === "sent"){
        return <span className="status-badge">Friend request pending</span>
        
    }

    if(status === "received"){
        return (
            <>
                <span className="status-badge">Wants to be your friend</span>
                <button type="button" className="btn-solid" onClick={onAccept}>Accept</button>
                <button type="button" onClick={onDecline}>Decline</button>
            </>
        )
    }

    return (
        <>
            <span className="status-badge">Not friends</span>
            <button type="button" className="btn-solid" onClick={onAdd}>Add friend</button>
        </>
    )
}

export default FriendActions
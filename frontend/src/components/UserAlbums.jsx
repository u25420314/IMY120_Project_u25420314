const PLACEHOLDER = "https://placehold.co/300"

function UserAlbums({ albums}){
    return (
        <section>
            <h2>Albums ({albums.length})</h2>

            {albums.length === 0 ? (
                <p>No Albums yet</p>
            ) : (
                <div className="album-grid">
                    {albums.map((album) => (
                        <div key={album._id} className="album-card">
                            <img src={album.coverImage || PLACEHOLDER} alt={`Cover of ${album.name}`}/>
                            <h3>{album.name}</h3>
                            <p>{(album.postIds || []).length} photos</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default UserAlbums
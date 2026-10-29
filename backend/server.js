require("dotenv").config()
const express = require("express")
const cors = require("cors")

const { connectDB , getDB} = require("./db")
const { ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

function idVariants(ids){
    const strings = ids.filter(Boolean).map(id => id.toString())
    const objectIds = strings.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id))
    return [...strings, ...objectIds]
}




//update user profile

app.put("/api/users/:id", async (req, res) => {
    const {username, bio, profilePicture} = req.body

    try{
        const db = getDB();
        const result = await db.collection("Users").updateOne(
            {_id: new ObjectId(req.params.id)},
            { $set : { username, bio, profilePicture}}
        )

        if(result.matchedCount === 0) {
            return res.status(404).json ({ error: "User not found"})
        }

        res.status(200).json({message : "Profile updated succesfully"})
    }catch(error){
        console.error("Error updating profile", error);
        res.status(500).json({error : "Failed to updated profile"})
    }
})

//send friend request

app.post("/api/users/friend-request", async (req, res) => {
    const {senderId, recieverId } = req.body;

    try{
        const db = getDB();
        await db.collection("Users").updateOne(
            { _id: new ObjectId(recieverId)},
            { $addToSet: { friendRequests: senderId}}
        )
        res.status(200).json({ message: "Friend request has been sent"})
    }catch(error){
        console.error("Error sending friend requests", error)
        res.status(500).json({error : "Failed to send a friend request"})
    }
})

//accept a friend
app.post("/api/users/accept-friend", async ( req, res) => {
    const {userId, friendId} = req.body

    if(userId == recieverId){
        return res.status(400).json({ error: "YOu cannot friend yourself"})
    }
    try{
        const db = getDB()

        await db.collection("Users").updateOne(
            { _id: new ObjectId(userId)},
            {
                $addToSet: {friends: friendId}, $pull : { friendRequests: friendId}
            }
        );
        await db.collection("Users").updateOne(
            { _id: new ObjectId(friendId)},
            {$addToSet: {friends: userId}}
        );

        res.status(200).json({message : "Friend request has been accepted"})
    }catch(error){
        console.error("Error accpeting friend request", error)
        res.status(500).json({error: "Failed to accept friend request"})
    }
})

//decline a friend request
app.post("/api/users/decline-friend", async (req, res) => {
    const {userId, friendId} = req.body

    if(!ObjectId.isValid(userId) || !ObjectId.isValid(friendId)){
        return res.status(400).json({ error: "invalid id"})
    }

    try{
        const db = getDB()

        await db.collection("Users").updateOne(
            { _id: new ObjectId(userId)},
            { $pull: { friendRequests: friendId}}
        )

        res.status(200).json({message: "Friend request decline"})
    }catch(error){
        console.error("Error declining friend request", error)
        res.status(500).json({ error: "Failed to decline friend request"})
    }


})

//remove a friend(unfriend)
app.post("/api/users/unfriend", async (req, res) => {
    const {userId, friendId} = req.body;

    try{
        const db = getDB();
        await db.collection("Users").updateOne(
            { _id: new ObjectId(friendId)},
            { $pull: { friends: userId}}

        

        )

        await db.collection("Users").updateOne(
            { _id: new ObjectId(userId)},
            { $pull: { friends: friendId}}

        )
        res.status(200).json({message : "Successfully removed friend"})
    }catch(error){
        console.error("Error removing friend", error);
        res.status(500).json({error : "Failed to remove friend"})
    }
})

//delete user profile
app.delete("/api/users/:id", async (req, res) => {
    const userId = req.params.id;

    if(!ObjectId.isValid(userId)){
        return res.status(400).json ({ error: "Invalid user ID"})
    }

    try{
        const db = getDB();
        const objectId = new ObjectId(userId);

        const userResult = await db.collection("Users").deleteOne({ _id: objectId})

        if(userResult.deletedCount === 0){
            return res.status(404).json({ error : "User not found"})
        }

        await db.collection("Posts").deleteMany({ userId: userId})

        await db.collection("Albums").deleteMany({userId: userId})

        res.status(200).json({message: "User profile and associated data has been deleted"})
    }catch(error){
        console.error("Error deleting user profile", error)
        res.status(200).json({message: "Failed to delete user profile"})
    }
})

//
// -----------POST ENDPOINTS ----_-------
//

async function canManage(db, ownerId, userId) {
    if(!userId){
        return false
    }

    if(ownerId?.toString() === userId){
        return true
    }

    if(!objectId.isValid(userId)) {
        return false
    }

    const user = await db.collection("Users").findOne({ _id: new ObjectId(userId)})
    return user?.role ==="admin"
}

//get ome post and the album it is for the post page
app.get("/api/posts/:id", async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: "invalid post id"})
    }


    try{
        const db = getDB()
        const post = await db.collection("Posts").findOne({ _id: new ObjectId(req.params.id)})

        if(!post){
            return res.status(404).json({ error: "Post not found"})

        }

        const albums = await db.collection("Ablums")
            .find({ postIds: req.params.id})
            .project({ name: 1})
            .toArray(0)

        res.status(200).json({ ...post, albums })
    }catch(error){
        console.error("error retrieving post", error)
        res.status(500).json({ error: "Failed to retrieve post"})
    }
})

//retrieve all of the posts
app.get("/api/posts", async (req, res) => {

    const { scope = "global", userId, sort = "newest", hashtag, author} = req.query

    try{

        const db = getDB()
        const filter = {}

        if(scope === "local"){
            if(!ObjectId.isValid(userId)){
                return res.status(400).json({ error: "valid userId required for local feed"})

            }

            const user = await db.collection("Users").findOne({ _id: new ObjectId(userId)})
            if(!user){
                return res.status(404).json({ error: "user not found"})
            }

            filter.userId = {$in: idVariants([userId, ...(user.friends || [])])}

            const ids = [userId, ...(user.friends || [])].map(id => id.toString())
            const objectIds = ids.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id))
            filter.userId = {$in: [...ids, ...objectIds]}
        }

        if(author){
            filter.userId = {$in: idVariants([author])}
        }
        
        


        if(hashtag){
            const tag = hashtag.replace(/^#/, "")
            filter.hashtags = {$in: [tag, `#${tag}`]}
        }
        let posts = await db.collection("Posts").find(filter).sort({ createdAt: -1}).toArray()

        if(sort === "comments"){
            posts.sort((a,b) => (b.comments?.length || 0) - (a.comments?.length || 0))
        }
        res.status(200).json(posts)
    }catch(error){
        console.error("Error retrieving posts", error)
        res.status(500).json({ error : "Failed to retrieve posts"})
    }
})

//craete a post (img desc and hash)
app.post("/api/posts", async (req, res) => {
    const {userId, username, caption, imageUrl, hashtags} = req.body;

    if(!caption || !caption.trim()){
        return res.status(400).json({ error: "Caption is required"})
    }

    try{
        const db = getDB()
        const newPost = {
            userId,
            username,
            caption,
            imageUrl: imageUrl || "",
            hashtags: hashtags || [],
            likes: [],
            comments: [],
            reports: [],
            createdAt: new Date()
        }

        const result = await db.collection("Posts").insertOne(newPost)

        res.status(201).json({
            _id: result.insertedId,
            ...newPost
        });

    }catch(error){
        console.error("Error adding post: ", error)
        res.status(500).json({error: "Failed to load post"})
    }
});


//edit post desc and hashtags
app.put("/api/posts/:id", async (req, res) => {

    const {caption, hashtags, userId} = req.body

    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(userId)){
        return res.status(400).json({ error : "Invalid id"})
    }

    if(!caption || !caption.trim()){
        return res.status(400).json({ error: "Caption is required"})
    }

    try{
        const db = getDB()

        const post = await db.collection("Posts").updateOne({ _id: new ObjectId(req.params.id)})

        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        if(!(await canManage(db, post.userId, userId))){
            return res.status(403).json({ error: "You can only edit your own posts"})
        }

       await db.collection("Posts").updateMany({ userId: req.params.id }, { $set: { username } })

        
        
        res.status(200).json({messsage : "Post updated successfully"})
        
    }catch (err){
        console.error("Error updating post:", error)
        res.status(500).json({error : "Failed to update post"})
    }
})


//delete post
app.delete("/api/posts/:id", async (req, res) => {

    const {userId}= req.body || {}

    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: "invalid post id"})
    }


    try{
        const db = getDB();
        const post = await db.collection("Posts").findOne({_id: new ObjectId(req.params.id)})

        if(!post){
                return res.status(404).json({ error: "Post not found"})
        }

        if(!(await canManage(db, post.userId, userId))){
                return res.status(403).json({ error: "You can only delete your own posts"})
        }

        await db.collection("Posts").deleteOne({ _id: post._id })

        

        await db.collection("Albums").updateMany(
            {},
            { $pull: { postIds: req.params.id}}
        )

        res.status(200).json ({ message : "Post deleted successfully"})

    }catch(error) {
        console.error ("Error deleting post", error); 
        res.status(500).json({error: "Failed to delete a post"})
    }
});

//coment on  post
app.post("/api/posts/:id/comments", async ( req ,res) => {

    const {userId, username, text} = req.body;

    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: "Invalid post id"})
    }

    if( !text || !text.trim()){
        return res.status(400).json({ error : "Comment text is required"})


    }

    try{
        const db = getDB();
        const comment = {
            commentId: new ObjectId(),
            userId,
            username,
            text: text.trim(),
            createdAt: new Date()
        };

        const result = await db.collection("Posts").updateOne(
            { _id: new ObjectId(req.params.id)},
            { $push: { comments: comment}}
        );

        if(result.matchedCount === 0){
            return res.status(404).json({ error: "Post not found"})
        }

        res.status(201).json(comment);
        }catch(error){
            console.error("Error adding a comment: ", error)
            res.status(500).json({ error: "Failed to add comment"})
        }
})

//report
app.post("/api/posts/:id/report", async (req, res) => {

    const { reason, reportedBy} = req.body
    try{
        const db = getDB();
        const report = { reason, reportedBy, createdAt: new Date()}

        await db.collection("Posts").updateOne(
            { _id: new ObjectId(req.params.id)},
            { $push: { reports: report}}
        )

        res.status(200).json ({ message : "Post reported successfully"})

    }catch(error) {
        console.error ("Error reporting post", error); 
        res.status(500).json({error: "Failed to report a post"})
    }
});

//
//---------------ALBUMS ENDPOINTS----------------
//

//retrieve all of the albums
app.get("/api/albums", async (req, res) => {
    const { userId } = req.query


    try{
        const db = getDB()
        const filter = userId ? { userId: {$in: idVariants([userId])} } : {}
        const albums = await db.collection("Albums").find(filter).sort({ createdAt: -1 }).toArray()

        const firstPostIds = albums.map(album => album.postIds?.[0]).filter(id => id && ObjectId.isValid(id))
        const covers = await db.collection("Posts")
            .find({ _id: {$in: firstPostIds.map(id => new ObjectId(id))} })
            .project({ imageUrl: 1})
            .toArray()

        const result = albums.map(album => {
            const cover = covers.find(post => post._id.toString() === album.postIds?.[0]?.toString())
            return { ...album, coverImage: cover?.imageUrl || "" }
        })
        res.status(200).json(result)
    }catch(error){
        console.error("Error retrieving albums", error)
        res.status(500).json({ error : "Failed to retrieve albums"})
    }
})

//create an album
app.post("/api/albums", async (req, res) => {
    const {userId, name, description, hashtags} = req.body;

    if(!name || !name.trim()){
        return res.status(400).json({ error: "Album name is required"})
    }

    try{
        const db = getDB()
        const newAlbum = {
            userId,
            name,
            description: description || "",
            hashtags: hashtags || [],
            createdAt: new Date()
        }

        const result = await db.collection("Albums").insertOne(newAlbum)

        res.status(201).json({
            _id: result.insertedId,
            ...newAlbum
        });

    }catch(error){
        console.error("Error adding album: ", error)
        res.status(500).json({error: "Failed to create album"})
    }
});

//edit album name desc and hash
app.put("/api/albums/:id", async (req, res) => {

    const {name, description, hashtags} = req.body


    try{
        const db = getDB()

        const results = await db.collection("Albums").updateOne({ _id: new ObjectId(req.params.id)}, { $set : { name, description, hashtags}})
        if(!results){
            return res.status(404).json({error: "Post not found"})
        }
        if(results.userId.toString() !== userId){
            return res.status(403).json({ error: "You can only edit your own posts"})
        }

        
        
        res.status(200).json({messsage : "Album updated successfully"})
        
    }catch (err){
        console.error("Error updating Album:", error)
        res.status(500).json({error : "Failed to update Album"})
    }
})

//delete album
app.delete("/api/albums/:id", async (req, res) => {
    try{
        const db = getDB();
        const result = await db.collection("Albums").deleteOne({_id: new ObjectId(req.params.id)})

        if(result.deletedCount === 0){
            return res.status(404).json({ error: "Album not found"})


        }

        res.status(200).json ({ message : "Album deleted successfully"})

    }catch(error) {
        console.error ("Error deleting album", error); 
        res.status(500).json({error: "Failed to delete a album"})
    }
});

//add post to album
app.post("/api/albums/:id/posts", async (req, res) => {
    const {postId} = req.body;

    try{
        const db = getDB();
        await db.collection("Albums").updateOne(
            { _id : new ObjectId(req.params.id)},
            { $addToSet: { postIds: postId}}
        )

        res.status(200).json({ message: "Post added to album successfully"})
        


    }catch(error) {
        console.error ("Error adding post to album", error); 
        res.status(500).json({error: "Failed to add post to album"})
    }
});

//remove post from album
app.delete("/api/albums/:id/posts/:postId", async (req, res) => {
    const {id, postId} = req.params;

    try{
        const db = getDB();
        await db.collection("Albums").updateOne(
            { _id: new ObjectId(id)},
            { $pull: { postIds: postId}}
        )

        res.status(200).json({ message : "Post removed from album successfully"})

    }catch(error){
        console.error("Error removing post from album", error);
        res.status(500).json({error: "Failed to remove post from album"})
    }
})

//health
app.get("/api/health", (req, res) => {
    res.json({status : "ok"})
})


//signup
app.post("/api/signup", async (req, res) =>{

    const {username, email, password} = req.body
    if(!username || !email || !password){
            return res.status(400).json({message: "Username, email and password are required"})
    }
    
    try{
        const db = getDB()
        const usersCollection = db.collection("Users")

        const exists = await usersCollection.findOne({ email })
        
        if(exists){
            return res.status(409).json({message: "An account with this email already exsts"})

        }

        const newUser = {
            username,
            email,
            password,
            bio: "",
            profilePicture: "",
            friends: [],
            friendRequests: []
        }

         const result = await usersCollection.insertOne(newUser);
         

        res.status(201).json({
            _id: result.insertedId,
            username,
            email,
            message: "Signup successfull",
            //user: {id, username: username.trim(), email: cleanEmail}
        })
    }catch(error) {
        console.error("Error signing up: ", error)
        res.status(500).json({ message: "Failed to Signup"})
    }

})


//login
app.post("/api/login", async (req, res) =>{

    const {email, password} = req.body

    if(!email || !password) {
            return res.status(400).json({message : "Email and password are required"})
    }


    try{


        const db = getDB();
        const user = await db.collection("Users").findOne({email, password})


        if(!user){
            return res.status(401).json({message : "Invalid email or password"})

        }

        const {password: _pw, ...safeUser} = user

        res.status(200).json(safeUser)
    }catch(error){
        console.error("Error loggin in:", error)
        res.status(500).json({error: "Failed to log in"})
    }
    

    
})

//get all users for global feeds
app.get("/api/users", async (req, res) => {
    try{
        const users = await getDB().collection("Users").find().toArray();

        const safeUsers = users.map(({ password, ...rest}) => rest)
        res.status(200).json(safeUsers);

    }catch(error){
        console.error("Error retrieving users:", error)
        res.status(500).json({ error: "Failed to retrieve users"})
    }
})
app.get("/api/users/:id/connections", async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: "Invalid user id"})
    }

    try{
        const db = getDB()
        const user = await db.collection("Users").findOne({ _id: new ObjectId(req.params.id)})

        if(!user){
            return res.status(404).json({ error: "User not found"})
        }
        const toObjectIds = (ids = []) => ids.filter(id => id && ObjectId.isValid(id)).map(id => new ObjectId(id))
        const publicFields = { username: 1, profilePicture: 1 }

        const friends = await db.collection("Users")
            .find({ _id: {$in: toObjectIds(user.friends)} })
            .project(publicFields)
            .toArray()

        const requests = await db.collection("Users")
            .find({ _id: {$in: toObjectIds(user.friendRequests)} })
            .project(publicFields)
            .toArray()

        res.status(200).json({ friends, requests })
    }catch(error){
        console.error("Error retrieving connections", error)
        res.status(500).json({ error: "Failed to retrieve friends"})
    }
})

//get the users by their id
app.get("/api/users/:id", async (req, res) => {
    try{
        const user = await getDB().collection("Users").findOne({ _id: new ObjectId(req.params.id)})


        
        if(!user){
            return res.status(404).json({ error: "User not found"})
        }

        const {password: _pw, ...safeUser} = user

        res.status(200).json(safeUser)
    }catch(err){
        console.error("Error retrieving user profile",err)
        res.status(500).json({ error: "Failed to retrieve user profile"})
    }
})

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`)
// })


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Could not connect MongoDB", err.message)
        process.exit(1)
    })
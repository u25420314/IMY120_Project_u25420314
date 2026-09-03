export const dummyProfiles = [
    {
        id: 1,
        name: "Christian Khaled",
        username: "Chrisk",
        image: "https://placehold.co/100"

    },
    { 
        id: 2, 
        name: "test", 
        username: "testUsername", 
        avatarUrl: "https://placehold.co/100" 
    }


]

export const dummyPosts = [
    { 
        id: 1, 
        author: dummyProfiles[1], 
        imageUrl: "https://placehold.co/400", 
        caption: "Caption1", 
        likes: 12, 
        commentsCount: 1 
    },

    { 
        id: 2, 
        author: dummyProfiles[0], 
        imageUrl: "https://placehold.co/400", 
        caption: "Caption2",
        likes: 5, 
        commentsCount: 0 
    }
]

export const dummyComments = [
    { 
        id: 1, 
        author: "testAuthor", 
        text: "Cool photo" 
    }
]

export const dummyFriends = [dummyProfiles[1]]

export const currentUser = dummyProfiles[0]
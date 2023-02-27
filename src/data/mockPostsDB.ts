const posts: Array<any> = [
    {
        "id": 1,
        "text": "(Mock) Lorem ipsum",
        "user": {
            "username": "(Mock) John"
        }
    },
    {
        "id": 2,
        "text": "(Mock) Lorem ipsum",
        "user": {
            "username": "(Mock) Dave"
        }
    },
];

const reviews = [
    {
        reviewId: "r1",
        stars: 3,
        text: "(Mock) Friendly staff. Interlibrary loan is super fast",
        businessId: "b1",
        userId: "u1",
    },
    {
        reviewId: "r2",
        stars: 4,
        text: "(Mock) Easy downtown access, lots of free parking",
        businessId: "b1",
        userId: "u2",
    },
    {
        reviewId: "r3",
        stars: 5,
        text: "(Mock) Lots of glass and sunlight for reading. Comfy chairs in large print section.",
        businessId: "b1",
        userId: "u1",
    },
];

const users = [
    {
        userId: "u1",
        name: "(Mock) Will",
        reviewIds: ["r1", "r2"],
    },
    {
        userId: "u2",
        name: "(Mock) Bob",
        reviewIds: ["r3"],
    },
];

export default { posts, reviews, users };

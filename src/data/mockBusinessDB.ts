const businesses = [
    {
        businessId: "b1",
        name: "(Mock) Missoula Public Library",
        address: "301 E Main St, Missoula, MT 59802",
        reviewIds: ["r1", "r2"],
    },
    {
        businessId: "b2",
        name: "(Mock) San Mateo Public Library",
        address: "55 W 3rd Ave, San Mateo, CA 94402",
        reviewIds: ["r3"],
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

export const db =  { businesses, reviews, users };

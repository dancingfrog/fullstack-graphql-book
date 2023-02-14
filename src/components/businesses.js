const businesses = [
    {
        "name": "San Mateo Public Library",
        "businessId": "b1",
        "address": "55 W 3rd Ave",
        "city": "San Mateo",
        "category": "Library",
        "categories": [
            {
                "name": "Library",
                "__typename": "Category"
            }
        ]
    },
    {
        "name": "Ducky's Car Wash",
        "businessId": "b2",
        "address": "716 N San Mateo Dr",
        "city": "Santa Clara",
        "category": "Car Wash",
        "categories": [
            {
                "name": "Car Wash",
                "__typename": "Category"
            }
        ]
    },
    {
        "name": "Hanabi",
        "businessId": "b3",
        "address": "723 California Dr",
        "city": "Burlingame",
        "category": "Restaurant",
        "categories": [
            {
                "name": "Restaurant",
                "__typename": "Category"
            },
            {
                "name": "Breakfast",
                "__typename": "Category"
            }
        ]
    }
];

export default businesses;

export const business_columns = [
    "marked",
    "name",
    "businessId",
    "address",
    "city",
    "categories"
];

export const business_labels = {
    "marked": "Marked",
    "name": "Business Name",
    "businessId": "ID",
    "address": "Street Address",
    "city": "City/Town",
    "categories": "Category"
};

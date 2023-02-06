const businesses = [
    {
        name: "San Mateo Public Library",
        businessId: "b1",
        address: "55 W 3rd Ave",
        city: "San Mateo",
        category: "Library",
    },
    {
        name: "Ducky's Car Wash",
        businessId: "b2",
        address: "716 N San Mateo Dr",
        city: "Santa Clara",
        category: "Car Wash",
    },
    {
        name: "Hanabi",
        businessId: "b3",
        address: "723 California Dr",
        city: "Burlingame",
        category: "Restaurant",
    },
];

export default businesses;

export const business_columns = [
    "name",
    "businessId",
    "address",
    "city",
    "category",
];

export const business_labels = {
    name: "Business Name",
    businessId: "ID",
    address: "Street Address",
    city: "City/Town",
    category: "Category",
};

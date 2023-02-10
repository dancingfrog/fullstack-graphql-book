export const CREATE_BIZ_MUTATION = `
mutation (
  $businessIdInput: ID,
  $categoryInput: String,
  $createBusinessesInput: [BusinessCreateInput!]!
) {
  createBusinesses (input: $createBusinessesInput) {
    businesses {
      businessId,
      name,
      address,
      city
    }
  }
  updateBusinesses (
    where: { businessId: $businessIdInput }
    connect: { categories: { where: { node: { name: $categoryInput }}}}
  ) {
    businesses {
      name
      categories {
        name
      }
    }
  }
}
`

export const CREATE_BIZ_PARAMS = {
    "businessIdInput": "b10",
    "categoryInput": "Car Wash",
    "createBusinessesInput": [
        {
            "businessId": "b10",
            "name": "76 Station",
            "address": "3500 S Centinela Ave, Los Angeles, CA 90066",
            "city": "Los Angeles",
            "state": "CA",
            "location": { "latitude": 34.0114279, "longitude": -118.4375091, "height": 18.04 }
        }
    ]
}

export const CREATE_BIZ_OUTPUT = {
    "createBusinesses": {
        "businesses": [
            {
                "businessId": "b10",
                "name": "76 Station",
                "address": "3500 S Centinela Ave, Los Angeles, CA 90066",
                "city": "Los Angeles"
            }
        ]
    },
    "updateBusinesses": {
        "businesses": [
            {
                "name": "76 Station",
                "categories": [
                    {
                        "name": "Car Wash"
                    }
                ]
            }
        ]
    }
}

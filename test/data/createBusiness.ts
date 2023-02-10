export const CREATE_BIZ_MUTATION = `
mutation (
  $businessIdInput: ID,
  $categoryInput: String,
  $createCategoryInput: [CategoryCreateInput!]!
) {
  createCategories(input: $createCategoryInput) {
    categories {
      name
      businesses {
        businessId,
        name,
        address,
        city
      }
    }
    info {
      nodesCreated
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
    info {
      relationshipsCreated
    }
  }
  deleteBusinesses (
    where: { businessId: $businessIdInput }
  ) {
    nodesDeleted
  }
  deleteCategories (
    where: { name: $categoryInput }
  ) {
    nodesDeleted
  }
}
`

const businessIdInput = "b10";
const categoryInput = "Gas";
const businessName = "76 Station";
const businessAddress = "3500 S Centinela Ave, Los Angeles, CA 90066";
const businessCity = "Los Angeles";
const businessLocation = { "latitude": 34.0114279, "longitude": -118.4375091, "height": 18.04 };
const businessState = "CA";

export const CREATE_BIZ_PARAMS = {
    "businessIdInput": businessIdInput,
    "categoryInput": categoryInput,
    "createCategoryInput": [
        {
            "name": categoryInput,
            "businesses": {
                "create": [
                    {
                        "node": {
                            "businessId": businessIdInput,
                            "name": businessName,
                            "address": businessAddress,
                            "city": businessCity,
                            "state": businessState,
                            "location": businessLocation
                        }
                    }
                ]
            }
        }
    ]
}

export const CREATE_BIZ_CAT_OUTPUT = {
    "createCategories": {
        "categories": [
            {
                "name": categoryInput,
                "businesses": [
                    {
                        "businessId": businessIdInput,
                        "name": businessName,
                        "address": businessAddress,
                        "city": businessCity
                    }
                ],
            }
        ],
        "info": {
            "nodesCreated": 2
        }
    },
    "updateBusinesses": {
        "businesses": [
            {
                "name": businessName,
                "categories": [
                    {
                        "name": categoryInput
                    }
                ]
            }
        ],
        "info": {
            "relationshipsCreated": 0
        }
    },
    "deleteBusinesses": {
        "nodesDeleted": 1
    },
    "deleteCategories": {
        "nodesDeleted": 1
    }
}

export const CREATE_BOOKS_MUTATION = `
mutation($createBusinessesInput: [BookCreateInput!]!) {
  createBusinesses(input: $createBusinessesInput) {
    books {
      title,
      author
    }
  }
}
`

export const CREATE_BOOKS_PARAMS = {
    "createBusinessesInput": [
        {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald"
        },
        {
            "title": "Beloved",
            "author": "Toni Morrison"
        }
    ]
}

export const CREATE_BOOKS_OUTPUT = {
    "books": [
        {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald"
        },
        {
            "title": "Beloved",
            "author": "Toni Morrison"
        }
    ]
}

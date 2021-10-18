import { gql } from "@apollo/client"

export const typeDefs = gql`
  enum Sort {
    asc
    desc
  }

  input PersonOrderByPrice {
    pricePerQty: Sort
  }

  type Person {
    id: ID!
    name: String!
    fromDate: String!
    toDate: String!
    searchString: String!
    imageUrl: String!
    pricePerQty: Float!
  }

  type Query {
    persons(
      date: String!
      searchString: String!
      minPrice: Int
      maxPrice: Int
      page: Int
      orderBy: PersonOrderByPrice
    ): [Person]
  }
`

import { gql } from "@apollo/client"

export const GET_PERSONS = gql`
  query Persons(
    $date: String!
    $searchString: String!
    $minPrice: Int
    $maxPrice: Int
    $page: Int
    $orderBy: PersonOrderByPrice
  ) {
    persons(
      date: $date
      searchString: $searchString
      minPrice: $minPrice
      maxPrice: $maxPrice
      page: $page
      orderBy: $orderBy
    ) {
      id
      name
      fromDate
      toDate
      searchString
      imageUrl
      pricePerQty
    }
  }
`

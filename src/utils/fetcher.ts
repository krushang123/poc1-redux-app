import request from "graphql-request"

export const fetcher = (query, variables) =>
  request("http://localhost:3000/api/graphql", query, variables)

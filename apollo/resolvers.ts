import * as R from "ramda"
import { isWithinInterval, parseISO } from "date-fns"

import { personsData } from "data/persons"

export const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    persons: (_parent, args, _context, _info) => {
      const {
        date,
        searchString,
        minPrice = 1000,
        maxPrice = 4000,
        page = 1,
        orderBy = {
          pricePerQty: "desc",
        },
      } = args

      const filterData = (date, searchString, minPrice, maxPrice, orderBy) =>
        personsData
          .filter((e) =>
            isWithinInterval(date ? parseISO(date) : new Date(), {
              start: parseISO(e.fromDate),
              end: parseISO(e.toDate),
            }),
          )
          .filter((e) => {
            if (searchString.length === 0) {
              return true
            }
            return e.searchString === searchString
          })
          .filter((e) => e.pricePerQty >= minPrice && e.pricePerQty <= maxPrice)
          .sort((a, b) => {
            if (orderBy.pricePerQty === "asc") {
              return a.pricePerQty - b.pricePerQty
            }

            return b.pricePerQty - a.pricePerQty
          })

      const data = filterData(date, searchString, minPrice, maxPrice, orderBy)

      return R.take(page * 10, data)
    },
  },
}

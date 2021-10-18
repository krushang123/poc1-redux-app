import * as React from "react"
import { GetServerSideProps } from "next"
import { format } from "date-fns"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  useUpdateEffect,
} from "@chakra-ui/react"

import PersonCard from "components/person-card"
import FilterBar from "components/filter-bar"
import { GET_PERSONS } from "gql/queries"
import {
  searchAsync,
  selectDate,
  selectPage,
  selectMaxPrice,
  selectMinPrice,
  selectPersons,
  selectSearchString,
  selectSortOrder,
  setDate,
  setPage,
  setMaxPrice,
  setMinPrice,
  setPersons,
  setSearchString,
  setSortOrder,
} from "components/searchSlice"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { fetcher } from "utils/fetcher"

const NoResultFound = () => (
  <Alert status='error'>
    <AlertIcon />
    <AlertTitle mr={2}>No Result Found!!</AlertTitle>
    <AlertDescription>
      Please search with different date and search string
    </AlertDescription>
  </Alert>
)

const Index = ({ data, variables }) => {
  const loaderRef = React.useRef(null)

  const dispatch = useAppDispatch()

  const persons = useAppSelector(selectPersons)

  const date = useAppSelector(selectDate)
  const searchString = useAppSelector(selectSearchString)
  const minPrice = useAppSelector(selectMinPrice)
  const maxPrice = useAppSelector(selectMaxPrice)
  const page = useAppSelector(selectPage)
  const sortOrder = useAppSelector(selectSortOrder)

  React.useEffect(() => {
    dispatch(setPersons(data.persons))
    dispatch(setDate(variables.date))
    dispatch(setSearchString(variables.searchString))
    dispatch(setMinPrice(variables.minPrice))
    dispatch(setMaxPrice(variables.maxPrice))
    dispatch(setPage(variables.page))
    dispatch(setSortOrder(variables.orderBy.pricePerQty))
  }, [data, dispatch, variables])

  const handleObserver = React.useCallback(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        dispatch(setPage(page + 1))
      }
    },
    [dispatch, page],
  )

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loaderRef.current) observer.observe(loaderRef.current)
  }, [handleObserver])

  useUpdateEffect(() => {
    dispatch(
      searchAsync({
        date,
        searchString,
        minPrice,
        maxPrice,
        page,
        sortOrder,
      }),
    )
  }, [page])

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={10}>
      <GridItem colSpan={1}>
        {searchString.length > 0 && <FilterBar />}
      </GridItem>

      <GridItem colSpan={4}>
        <SimpleGrid mt='2rem' columns={3} spacing='2rem'>
          {persons.map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
        </SimpleGrid>

        {persons.length === 0 && <NoResultFound />}
      </GridItem>

      <Box ref={loaderRef} />
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { date, searchString, minPrice, maxPrice, page, sortOrder } =
    context.query

  const query = GET_PERSONS

  const variables = {
    date: date || format(new Date(), "yyyy-MM-dd"),
    searchString: searchString || "",
    minPrice: Number(minPrice) || 1000,
    maxPrice: Number(maxPrice) || 4000,
    page: Number(page) || 1,
    orderBy: { pricePerQty: sortOrder || "asc" },
  }

  const data = await fetcher(query, variables)

  return {
    props: { data, variables },
  }
}

export default Index

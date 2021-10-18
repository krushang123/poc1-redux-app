import * as React from "react"
import { useRouter } from "next/router"
import { useAppSelector, useAppDispatch } from "app/hooks"
import { Box, Button, HStack, Input } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"

import {
  setDate,
  setSearchString,
  selectDate,
  selectSearchString,
  searchAsync,
  selectSortOrder,
  selectMinPrice,
  selectMaxPrice,
  selectPage,
} from "./searchSlice"

const SearchBar = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const date = useAppSelector(selectDate)
  const searchString = useAppSelector(selectSearchString)
  const minPrice = useAppSelector(selectMinPrice)
  const maxPrice = useAppSelector(selectMaxPrice)
  const page = useAppSelector(selectPage)
  const sortOrder = useAppSelector(selectSortOrder)

  const onSearch = React.useCallback(() => {
    router.push({
      pathname: "/",
      query: { date, searchString, minPrice, maxPrice, page, sortOrder },
    })

    dispatch(
      searchAsync({ date, searchString, minPrice, maxPrice, page, sortOrder }),
    )
  }, [date, searchString])

  return (
    <HStack px='3rem' py='1.5rem' spacing='5rem' bgColor='white' rounded='2xl'>
      <Box>
        <Input
          type='date'
          rounded='2xl'
          value={date}
          onChange={(e) => dispatch(setDate(e.target.value))}
        />
      </Box>

      <Box
        display='flex'
        w='20rem'
        borderWidth={1}
        p={2}
        rounded='2xl'
        alignItems='center'
      >
        <Search2Icon mx={4} />
        <Input
          type='text'
          placeholder='Enter search string'
          variant='unstyled'
          value={searchString}
          onChange={(e) => dispatch(setSearchString(e.target.value))}
        />
      </Box>

      <Button colorScheme='purple' onClick={onSearch}>
        Search
      </Button>
    </HStack>
  )
}

export default SearchBar

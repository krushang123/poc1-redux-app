import * as React from "react"
import { useRouter } from "next/router"
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  VStack,
  Heading,
  Radio,
  RadioGroup,
} from "@chakra-ui/react"

import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  setSortOrder,
  selectSortOrder,
  searchAsync,
  selectDate,
  selectSearchString,
  selectMinPrice,
  setMinPrice,
  selectMaxPrice,
  setMaxPrice,
  selectPage,
} from "components/searchSlice"

const PriceRange = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const date = useAppSelector(selectDate)
  const searchString = useAppSelector(selectSearchString)
  const minPrice = useAppSelector(selectMinPrice)
  const maxPrice = useAppSelector(selectMaxPrice)
  const page = useAppSelector(selectPage)
  const sortOrder = useAppSelector(selectSortOrder)

  const onChange = (value) => {
    dispatch(setMinPrice(value[0]))
    dispatch(setMaxPrice(value[1]))

    router.push({
      pathname: "/",
      query: {
        date,
        searchString,
        minPrice: value[0],
        maxPrice: value[1],
        page,
        sortOrder,
      },
    })

    dispatch(
      searchAsync({
        date,
        searchString,
        minPrice: value[0],
        maxPrice: value[1],
        page,
        sortOrder,
      }),
    )
  }

  return (
    <VStack w='full' alignItems='flex-start'>
      <Heading as='h2' mb={10}>
        Filter
      </Heading>

      <Text fontWeight='bold' fontSize='lg' mb={4}>
        Price
      </Text>

      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        defaultValue={[minPrice, maxPrice]}
        onChangeEnd={onChange}
        size='lg'
        min={1000}
        max={4000}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>

        <RangeSliderThumb boxSize={8} index={0}>
          <Text>{minPrice}</Text>
        </RangeSliderThumb>

        <RangeSliderThumb boxSize={8} index={1}>
          <Text>{maxPrice}</Text>
        </RangeSliderThumb>
      </RangeSlider>
    </VStack>
  )
}

const SortPrice = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const date = useAppSelector(selectDate)
  const searchString = useAppSelector(selectSearchString)
  const minPrice = useAppSelector(selectMinPrice)
  const maxPrice = useAppSelector(selectMaxPrice)
  const page = useAppSelector(selectPage)
  const sortOrder = useAppSelector(selectSortOrder)

  return (
    <VStack w='full' alignItems='flex-start'>
      <Text fontWeight='bold' fontSize='lg' mb={2}>
        Sort Price
      </Text>

      <RadioGroup
        onChange={(value: any) => {
          dispatch(setSortOrder(value))

          router.push({
            pathname: "/",
            query: {
              date,
              searchString,
              minPrice,
              maxPrice,
              page,
              sortOrder: value,
            },
          })

          dispatch(
            searchAsync({
              date,
              searchString,
              minPrice,
              maxPrice,
              page,
              sortOrder: value,
            }),
          )
        }}
        value={sortOrder}
      >
        <VStack>
          <Radio value='asc' defaultChecked>
            Low to High
          </Radio>
          <Radio value='desc'>High to Low</Radio>
        </VStack>
      </RadioGroup>
    </VStack>
  )
}

const FilterBar = () => (
  <VStack
    w='20rem'
    h='25rem'
    p={10}
    spacing={16}
    borderWidth={1}
    boxShadow='lg'
    rounded='lg'
  >
    <PriceRange />
    <SortPrice />
  </VStack>
)

export default FilterBar

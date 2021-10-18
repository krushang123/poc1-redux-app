import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { format } from "date-fns"

import type { RootState } from "app/store"
import { GET_PERSONS } from "gql/queries"
import { fetcher } from "utils/fetcher"

export interface Person {
  id: number
  name: string
  fromDate: string
  toDate: string
  searchString: string
  imageUrl: string
  pricePerQty: number
}

export interface SearchState {
  date: string
  searchString: string
  minPrice: number
  maxPrice: number
  sortOrder: "asc" | "desc"
  status: "idle" | "loading" | "failed"
  persons: Person[]
  page: number
}

const initialState: SearchState = {
  date: format(new Date(), "yyyy-MM-dd"),
  searchString: "",
  minPrice: 1000,
  maxPrice: 4000,
  sortOrder: "asc",
  status: "idle",
  persons: [],
  page: 1,
}

export const searchAsync = createAsyncThunk(
  "search/fetchPersons",
  async ({
    date,
    searchString,
    minPrice,
    maxPrice,
    page,
    sortOrder,
  }: {
    date: string
    searchString: string
    minPrice: number
    maxPrice: number
    page: number
    sortOrder: string
  }) => {
    const query = GET_PERSONS

    const variables = {
      date,
      searchString,
      minPrice,
      maxPrice,
      page,
      orderBy: { pricePerQty: sortOrder },
    }

    const data = await fetcher(query, variables)

    // const { persons } = data

    return data
  },
)

export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload
    },
    setPersons: (state, action: PayloadAction<Person[]>) => {
      state.persons = action.payload
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.persons = action.payload.persons
      })
  },
})

export const {
  setDate,
  setSearchString,
  setPersons,
  setSortOrder,
  setMinPrice,
  setMaxPrice,
  setPage,
} = searchSlice.actions

export const selectDate = (state: RootState) => state.search.date
export const selectSearchString = (state: RootState) =>
  state.search.searchString
export const selectMinPrice = (state: RootState) => state.search.minPrice
export const selectMaxPrice = (state: RootState) => state.search.maxPrice
export const selectSortOrder = (state: RootState) => state.search.sortOrder
export const selectStatus = (state: RootState) => state.search.status
export const selectPersons = (state: RootState) => state.search.persons
export const selectPage = (state: RootState) => state.search.page

export default searchSlice.reducer

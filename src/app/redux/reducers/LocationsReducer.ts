import { Resource } from "@/app/models/Resource";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Array<Resource>
}

const initialState: initialStateInterface = {
  value: []
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Array<Resource>>) => {
      state.value = action.payload
    },
  }
})

export const { setLocations } = locationsSlice.actions

export default locationsSlice.reducer
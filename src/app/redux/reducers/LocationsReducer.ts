import { Location } from "@/app/models/Location";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Array<Location>
}

const initialState: initialStateInterface = {
  value: []
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Array<Location>>) => {
      state.value = action.payload
    },
  }
})

export const { setLocations } = locationsSlice.actions

export default locationsSlice.reducer
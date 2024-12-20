import { Resource } from "@/app/models/Resource";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Resource | null
}

const initialState: initialStateInterface = {
  value: null
}

const componentSlice = createSlice({
  name: 'component',
  initialState: initialState,
  reducers: {
    setComponent: (state, action: PayloadAction<Resource>) => {
      state.value = action.payload
    },
  }
})

export const { setComponent } = componentSlice.actions

export default componentSlice.reducer
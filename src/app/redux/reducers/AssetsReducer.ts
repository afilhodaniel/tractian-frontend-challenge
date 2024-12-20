import { Resource } from "@/app/models/Resource";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Array<Resource>
}

const initialState: initialStateInterface = {
  value: []
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState: initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Array<Resource>>) => {
      state.value = action.payload
    },
  }
})

export const { setAssets } = assetsSlice.actions

export default assetsSlice.reducer
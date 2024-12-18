import { Asset } from "@/app/models/Asset";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Array<Asset>
}

const initialState: initialStateInterface = {
  value: []
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState: initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Array<Asset>>) => {
      state.value = action.payload
    },
  }
})

export const { setAssets } = assetsSlice.actions

export default assetsSlice.reducer
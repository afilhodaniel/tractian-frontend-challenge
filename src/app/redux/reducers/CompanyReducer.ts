import { Company } from "@/app/models/Company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  value: Company | null
}

const initialState: initialStateInterface = {
  value: null
}

const companySlice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.value = action.payload
    },
  }
})

export const { setCompany } = companySlice.actions

export default companySlice.reducer
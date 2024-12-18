import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./reducers/CompanyReducer"

const store = configureStore({
  reducer: {
    company: companyReducer
  }
})

export default store;
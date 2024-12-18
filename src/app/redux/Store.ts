import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./reducers/CompanyReducer"
import locationsReducer from "./reducers/LocationsReducer"
import assetsReducer from "./reducers/AssetsReducer"

const store = configureStore({
  reducer: {
    company: companyReducer,
    locations: locationsReducer,
    assets: assetsReducer,
  }
})

export default store;
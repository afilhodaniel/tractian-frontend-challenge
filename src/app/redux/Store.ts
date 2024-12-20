import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./reducers/CompanyReducer"
import locationsReducer from "./reducers/LocationsReducer"
import assetsReducer from "./reducers/AssetsReducer"
import componentReducer from "./reducers/ComponentReducer"

const store = configureStore({
  reducer: {
    company: companyReducer,
    locations: locationsReducer,
    assets: assetsReducer,
    component: componentReducer
  }
})

export default store;
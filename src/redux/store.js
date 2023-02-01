import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage";
import dataReducer from './reducer'


// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, dataReducer)

export const store = configureStore({
    reducer: {
        data: dataReducer
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
})
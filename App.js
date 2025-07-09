
import React from 'react';
import Route from './src/navigation/Route';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import { store } from './src/store';

export default function App() {
  //const persistor = persistStore(store);
  return (
    //<Provider store={store}>
     // <PersistGate loading={null} persistor={persistor}>
        <Route />
      //</PersistGate>
    //</Provider>

  );
}

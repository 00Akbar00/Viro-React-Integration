import React from 'react';
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./states/store";

const App: React.FC = () => {
  // Disable reporting console errors as exceptions
  // @ts-ignore: next-line
  console.reportErrorsAsExceptions = false;

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

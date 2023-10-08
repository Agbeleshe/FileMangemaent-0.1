import React, {FC} from "react";
//import TimeLinkRoutes from "./Routing/TimeLinkRoutes";
import MainRoutes from "./Routing/Routes";
import { useSelector } from "react-redux";
//import SignInRoutes from "./Routing/SignInRoutes";

interface RootState {
  auth: {
    isLoggedIn: boolean;
    // add other properties if needed
  };
  // add other reducers if needed
}

interface AppProps {
  // define props here if needed
}

const App: FC<AppProps> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div>
      <MainRoutes/>
      {/* <SignInRoutes />*/}
      {/* <TimeLinkRoutes/>*/}
    </div>
  );
}

export default App;

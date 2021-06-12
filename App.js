import * as React from "react";
import RootNavigation from "./navigation";
/* import { SafeAreaProvider } from "react-native-safe-area-context"; */

//context
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    /*   <SafeAreaProvider> */
    <AuthContextProvider>
      <RootNavigation />
    </AuthContextProvider>
    /*     </SafeAreaProvider> */
  );
}

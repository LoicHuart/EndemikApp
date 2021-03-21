import * as React from "react";
import RootNavigation from "./navigation";
/* import { SafeAreaProvider } from "react-native-safe-area-context"; */

//context
import { AuthContextProvier } from "./context/AuthContext";

export default function App() {
  return (
    /*   <SafeAreaProvider> */
    <AuthContextProvier>
      <RootNavigation />
    </AuthContextProvier>
    /*     </SafeAreaProvider> */
  );
}

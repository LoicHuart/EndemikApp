import * as React from 'react';
import RootNavigation from './navigation';

//context
import { AuthContextProvier } from './context/AuthContext';

export default function App() {
  return (
    <AuthContextProvier>
      <RootNavigation />
    </AuthContextProvier>
  );
}
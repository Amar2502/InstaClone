'use client';

import { store } from './store';
import { Provider } from 'react-redux';

interface IdentifierState {
  value: string;
}

interface UserState {
  identifier: string;
  isAuthenticated: boolean;
  // other user-related fields
}

const initialState: IdentifierState = {
  value: ""
};

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

import {
  useContext,
  createContext,
  type PropsWithChildren,
  useMemo,
} from "react";
import { useStorageState } from "./useStorageState";

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const AuthContext = createContext<{
  signIn: (user: any, token: string) => void;
  signOut: () => void;
  session?: string | null;
  user?: any;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingUser, user], setUser] = useStorageState("usersession");

  const valueProvider = useMemo(() => {
    return {
      signIn: (user: any, token: string) => {
        // Perform sign-in logic here
        console.log("Signing in", user, token);
        const stringifiedUser = JSON.stringify(user);
        setUser(stringifiedUser);
        setSession(token);
      },
      signOut: () => {
        setUser(null);
        setSession(null);
      },
      session,
      user: user ? JSON.parse(user) : null,
      isLoading: isLoading || isLoadingUser,
    };
  }, [session, user, isLoading, isLoadingUser]);

  return (
    <AuthContext.Provider value={valueProvider}>
      {children}
    </AuthContext.Provider>
  );
}

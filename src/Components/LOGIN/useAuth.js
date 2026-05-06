import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    // Simulating sign-in
    setUser({ email, password });
  };

  const signUp = (email, password, name) => {
    // Simulating sign-up
    setUser({ email, password, name });
  };

  const signOut = () => {
    // Simulating sign-out
    setUser(null);
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;

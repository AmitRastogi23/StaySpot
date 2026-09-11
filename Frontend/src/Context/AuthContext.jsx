import { createContext, useState } from "react";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

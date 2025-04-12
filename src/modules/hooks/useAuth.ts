import { useContext } from "react";
import { Authcontext } from "../AuthContext/AuthContext";
import { AuthContextType } from "../Interfaces/authenticationInterfaces";

export const useAuth = (): AuthContextType => {
    const context = useContext(Authcontext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

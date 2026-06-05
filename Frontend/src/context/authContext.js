import { createContext,useContext } from "react";


export const AuthContext  = createContext(

    {
        username : String
    }
);


export const useAuth = () => {
    return useContext(AuthContext);
}



export const AuthProvider = AuthContext.Provider;




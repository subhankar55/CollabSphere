import { createContext,useContext } from "react";


export const AuthContext  = createContext(

    {
        username : String,
        updateUsername : () => {}
    }
);


export const useAuth = () => {
    return useContext(AuthContext);
}



export const AuthProvider = AuthContext.Provider;




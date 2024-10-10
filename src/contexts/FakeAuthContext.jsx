import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext(); 


const initialState={
    user: null,
    isAuthenticated: false,
    error: ""
};
function reducer(state, action){
    switch(action.type){
        case "login":
            return {
                ...state, 
                user: action.payload, 
                isAuthenticated: true,
            }
            case "wrongAuth": 
            return{
                ...state, 
                isAuthenticated: false, 
                error: action.payload,
            }
        case "logout":
            return {
               ...state, 
               isAuthenticated: false,
               error: ""
            }
        default: 
        throw new Error("Invalid action");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({children}){
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)
    function login (email,password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type: 'login', payload: FAKE_USER});
        }
    }
    function wrongAuth(email, password){
        if(email !== FAKE_USER.email && password !== FAKE_USER.password) {}
    }
    function logout(){
        dispatch({type: 'logout'});
    }


    return(
        <AuthContext.Provider value={{
            user, 
            isAuthenticated,
            login,
            logout,
            wrongAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined)  throw new Error("Context is used outside the AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
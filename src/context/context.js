import { createContext, useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config'





export const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext)
// }



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // const unsubscribe = onAuthStateChanged(auth, user => {
        //     setUser(user)
        //     setLoading(false);
        // })

        // return unsubscribe


        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

    }, []);


    if (loading) {
        return "Loading.....";
    }

    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}


export default AuthProvider;
















import useAuth from "@/hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { currentUserAtom } from "@/jotai";
import { useSetAtom } from "jotai";
import useContract from "@/hooks/useContract";
import { useEffect, useState } from "react";

const LoginPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleLogin } = useAuth();
    const router = useRouter();
    const setCurrentUser = useSetAtom(currentUserAtom);
    const contract = useContract();

    
    async function getAllPrescriptions(prescriptionCount:number) {
        ///
    }

    const loginUser = async () => {
        setIsLoading(false);

        try {

            const { email } = await handleLogin();
            const response = await contract.GetPrescriberByEmail(email);
            
    
            await setCurrentUser({
                id: response[0],
                name: response[1],
                email: response[2],
                verified: response[3],
                gender: response[4],
                profile_pic: response[5],
                home_address: response[6],
                license_expiry: response[7],
                pharmacy_id: response[8],

                delegates: [],
                delegate_count: response[10],

                is_delegate: response[11],

                issued_prescriptions: [],
                issued_prescriptions_count: response[13],

            })
            router.push('/');
        } catch (e){
            alert(e)
        } finally {
            setIsLoading(true);
        }
        
    }
    return (
        <Box className="bg-white dark:bg-gray-800" width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <button 
                disabled={isLoading}
                onClick={loginUser}
                className="flex items-center justify-center text-white bg-blue-600 px-6 py-2 rounded-lg"
            >
                { isLoading ? <CircularProgress size={25} sx={{color:'#fff'}}/> : "Login"}
            </button>
        </Box>
    )
}

export default LoginPage;
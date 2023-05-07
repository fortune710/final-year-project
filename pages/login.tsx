import useAuth from "@/hooks/useAuth";
import { Box, Button } from "@mui/material";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
    const { handleLogin } = useAuth();
    return (
        <Box>
            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    )
}

export default LoginPage;
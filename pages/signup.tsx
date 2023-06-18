import usePrescribers from "@/hooks/usePrescibers";
import { Gender } from "@/types";
import { Box, Button, CircularProgress, Container, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { NextPage } from "next";
import Image from "next/image";
import { FormEvent, useState } from "react";

const SignUpPage: NextPage = () => {
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const { addPrescriberToBlockchain } = usePrescribers();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<any>();

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try {
            const data = new FormData(e.target as HTMLFormElement);
            const formData = Object.fromEntries(data);
    
            const response = await addPrescriberToBlockchain({
                name: formData.name as string,
                email: formData.email as string,
                home_address: formData.home_address as string,
                license_expiry: new Date(licenseExpiry).valueOf(),
                gender: formData.gender as Gender,
                profile_pic: `https://api.dicebear.com/6.x/initials/svg?seed=${formData.name}`,
                pharmacy_id: 0,         
            })
            alert(response);
        } catch (e){
            setError(e as any);
        } finally {
            setLoading(false);
        }
    }

    return(
        <main className="flex h-[100vh] items-center justify-center lg:grid lg:grid-cols-2">
            <div className="hidden h-full lg:block">
                <img
                    src="/sign-up.webp" 
                    alt="Doctor and a Patient" 
                    loading="eager"
                    width="100%"
                    className="h-full object-cover"
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col px-4 lg:px-8">
                    <h1>Sign Up</h1>
                    <TextField
                        sx={{ "::placeholder": "#fff" }}
                        variant="outlined"
                        label="Full Name"
                        margin="dense"
                        name="name"
                        placeholder="Enter your Full Name"
                    />

                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="home_address"
                        placeholder="Enter your Home Address"
                    />

                    <DatePicker 
                        sx={{ marginVerical: 5 }}
                        label="License Expiry"
                        slotProps={{
                            textField: {
                                helperText: "The date your license expires"
                            }
                        }}
                        onChange={(newDate) => setLicenseExpiry(newDate as string)}
                    />

                    <Container>
                        <InputLabel>Gender</InputLabel>
                        <RadioGroup name='gender' sx={{ display: 'flex' }}>
                            <Box display="flex" alignItems="center">
                                <Radio name='gender' value={"M"}/>
                                <InputLabel>Male</InputLabel>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Radio name='gender' value={"F"}/>
                                <InputLabel>Female</InputLabel>
                            </Box>
                        </RadioGroup>
                    </Container>

                    <button
                        type="submit"
                        className="flex items-center justify-center text-white bg-blue-600 px-6 py-2 rounded-lg"

                    >
                    { isLoading ? <CircularProgress size={25} sx={{color:'#fff'}}/> : "Complete Registration" }
                    </button>
                </div>


            </form>
        </main>
    )
}

export default SignUpPage;
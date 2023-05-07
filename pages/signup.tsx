import usePrescribers from "@/hooks/usePrescibers";
import { Gender } from "@/types";
import { Box, Button, Container, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { NextPage } from "next";
import { FormEvent, useState } from "react";

const SignUpPage: NextPage = () => {
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const { addPrescriberToBlockchain } = usePrescribers();


    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const formData = Object.fromEntries(data);

        const response = await addPrescriberToBlockchain({
            name: formData.name as string,
            email: formData.email as string,
            home_address: formData.home_address as string,
            license_expiry: new Date(licenseExpiry).valueOf(),
            gender: formData.gender as Gender,
            profile_pic: formData.profile_pic as string,
        })
        alert(response);
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    sx={{ "::placeholder": "#fff" }}
                    variant="outlined"
                    label="Full Name"
                    name="name"
                    placeholder="Enter your Full Name"
                />

                <TextField
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                />
                <TextField
                    margin="normal"
                    label="Profile Picture"
                    name="profile_pic"
                    placeholder="Enter Patient's Full Name"
                />
                <TextField
                    margin="normal"
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

                <Button 
                    type='submit'
                    variant="contained"
                    color="primary"
                >
                    Complete Registration
                </Button>
            </form>
        </main>
    )
}

export default SignUpPage;
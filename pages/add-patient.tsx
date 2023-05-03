import { NextPage } from "next";
import { Box, InputLabel, Radio, RadioGroup, TextField } from "@mui/material"
import SideMenu from "@/components/SideMenu";
const AddPatientPage: NextPage = () => {
    return(
        <SideMenu>
            <main>
                <Box marginTop={10}>

                    <TextField
                        focused={true}
                        sx={{ "::placeholder": "#fff" }}
                        variant="outlined"
                        label="Full Name"
                        name="full_name"
                        placeholder="Enter Patient's Full Name"
                    />

                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        placeholder="Enter Patient's Full Name"
                    />
                    <TextField
                        label="NIN"
                        name="nin"
                        placeholder="Enter Patient's Full Name"
                    />
                    
                    <RadioGroup>
                        <div>
                            <Radio value={"male"}/>
                            <InputLabel>Male</InputLabel>
                        </div>

                        <div>
                            <Radio value={"female"}/>
                            <InputLabel>Female</InputLabel>
                        </div>
                    </RadioGroup>
                    <TextField
                        
                        name="full_name"
                        placeholder="Enter Patient's Full Name"
                    />
                    
                </Box>
            </main>
        </SideMenu>
    )
}

export default AddPatientPage;
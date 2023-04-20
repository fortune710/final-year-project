import { NextPage } from "next";
import { InputLabel, Radio, RadioGroup, TextField } from "@mui/material"
const AddPatient: NextPage = () => {
    return(
        <main>
            <TextField
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

        </main>
    )
}

export default AddPatient;
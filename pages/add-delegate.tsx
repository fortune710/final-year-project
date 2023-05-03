import SideMenu from "@/components/SideMenu";
import { Box } from "@mui/material";
import { NextPage } from "next";

const AddPatientsPage: NextPage = () => {
    return(
        <SideMenu
            children={
                <main>
                </main>
            }
        />
    )
}

export default AddPatientsPage;
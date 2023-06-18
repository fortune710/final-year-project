import usePrescribers from "@/hooks/usePrescibers";
import { PrescriptionData } from "@/mock/presciption";
import { SearchOutlined } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, Snackbar, InputBase, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const AdminDashboard: NextPage = () => {
    const { 
      prescribers, 
      loadingPrescribers, 
      verifiedSuccess,
      verifiedLoading,
      verifyPrescriber 
    } = usePrescribers();

    const [query, setQuery] = useState("");

    return(
      <main className="p-10">

        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-center font-semibold text-xl">
            All Prescribers
          </h1>
          <Paper sx={{ boxShadow: 0, padding: 1, display:'flex', alignItems: 'center', background: "#f1f1f1" }}>
            <SearchOutlined sx={{ marginRight: '10px' }}/>
            <InputBase 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search for a user"
              type="search"
            />
          </Paper>
        </div>

        {
          loadingPrescribers ? <p>Loading...</p> : 
          <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-primary text-white">
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  query.length > 0 ?
                  prescribers?.filter((data) => data.name.toLowerCase().includes(query.toLowerCase())).map((data) => (
                    <TableRow>
                      <TableCell>{Number(data.id)}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      
                      <TableCell>
                        <Chip 
                          label={data.verified ? 'Verified' : 'Unverified'}
                          color={data.verified ? 'success' : 'error'}
                        />
                      </TableCell>

                      <TableCell>
                        <button 
                          disabled={data.verified}
                          onClick={() => verifyPrescriber(data.id as number)}
                          className="flex items-center justify-center bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                          { verifiedLoading ? 
                            <CircularProgress size={10} sx={{ color: 'white' }}/> 
                            : "Verify"
                          }
                        </button>
                      </TableCell>

                      <TableCell>
                        <button 
                          disabled={data.verified}
                          onClick={() => verifyPrescriber(data.id as number)}
                          className="flex items-center justify-center bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg"
                        >
                          Suspend
                        </button>
                      </TableCell>
                    </TableRow>

                  )):
                  prescribers?.map((data) => (
                    <TableRow>
                      <TableCell>{Number(data.id)}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      
                      <TableCell>
                        <Chip 
                          label={data.verified ? 'Verified' : 'Unverified'}
                          color={data.verified ? 'success' : 'error'}
                        />
                      </TableCell>

                      <TableCell>
                        <button 
                          disabled={data.verified}
                          onClick={() => verifyPrescriber(data.id as number)}
                          className="flex items-center justify-center bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                          { 
                            verifiedLoading ? 
                            <CircularProgress size={18} sx={{ color: 'white' }}/> 
                            : "Verify"
                          }
                        </button>
                      </TableCell>

                      <TableCell>
                        <button 
                          disabled={data.verified}
                          onClick={() => verifyPrescriber(data.id as number)}
                          className="flex items-center justify-center bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg"
                        >
                          Suspend
                        </button>
                      </TableCell>

                    </TableRow>

                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
        
        <Snackbar
          open={verifiedSuccess}
          color="success"
          message="Verified Prescriber Successfully"
          autoHideDuration={3000}
        />

      </main>
    )
}

export default AdminDashboard;
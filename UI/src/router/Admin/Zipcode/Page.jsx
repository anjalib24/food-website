import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom';
import EditFreeZipCode from "./EditFreeZipCode"

const Page = () => {
 const match = useRouteMatch();
 const history = useHistory();
   const [zipcode, setZipcode] = useState([]);

 useEffect(() => {
   const fetchReviews = () => {
     fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/free-zip-codes")
       .then((response) => {
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
       })
       .then((data) => {
         setZipcode(data.data);
       })
       .catch((error) => {
         console.error("Error:", error);
       });
   };

   fetchReviews();
 }, []); 
 console.log(zipcode,"zipcode");
 return (
<>
<Switch>
<Route path={match.path + "/:id"}>
        <EditFreeZipCode/>
      </Route>
               <Route path={match.path}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                              <TableRow>
                              <TableCell style={{ width: '100px' }} align="right">Zip Code</TableCell>
<TableCell style={{ width: '100px' }} align="right">county</TableCell>
<TableCell style={{ width: '100px' }} align="right">stateName</TableCell>
<TableCell style={{ width: '100px' }} align="right">stateCode</TableCell>
<TableCell style={{ width: '100px' }} align="right">shipment_delivery_message</TableCell>
<TableCell style={{ width: '100px' }} align="right">Actions</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {zipcode?.map((user) => (
                                 <TableRow
                                     key={user.userId}
                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                 >
                                     <TableCell style={{ width: '20%' }} component="th" scope="row" align="right">
                                         {user.zipCode}
                                     </TableCell>
                                     <TableCell style={{ width: '20%' }} align="right">{user?.county}</TableCell>
                                     <TableCell style={{ width: '20%' }} align="right">{user?.stateName}</TableCell>
                                     <TableCell style={{ width: '20%' }} align="right">{user?.stateCode}</TableCell>
                                     <TableCell style={{ width: '20%' }} align="right">{user?.shipment_delivery_message}</TableCell>
                                     <TableCell style={{ width: '20%' }} align="right">
                                     <Link to={`${match.path}/${user._id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ opacity: 0.9 }}
                      >
                        Edit
                      </Button>
                    </Link>
                                     </TableCell>
                                 </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
               </Route>
           </Switch>
</>
   )
}

export default Page
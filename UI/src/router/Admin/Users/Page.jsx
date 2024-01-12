import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const Page = () => {
    const match = useRouteMatch();
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_APP_BASE_API +'/api/v1/users/get-users?limit=50');
          console.log(response,"userdara");
          setUsers(response?.data?.data?.docs); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
console.log(users,"users------");
  return (
    <>
        <Switch>
        <Route path={match.path}>
      
        <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                      <TableRow>
       <TableCell align="right">User Name</TableCell>
       <TableCell align="right">User Email</TableCell>
       <TableCell align="right">Country</TableCell>
       <TableCell align="right">State</TableCell>
       <TableCell align="right">City</TableCell>
       <TableCell align="right">Actions</TableCell>
   </TableRow>
                      </TableHead>
                      <TableBody>
                          {users?.map((user) => (
                              <TableRow
                                 key={user.userId}
                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                 <TableCell component="th"  scope="row" align="right">
                                     {user.username}
                                 </TableCell>
                                 <TableCell align="right">{user.email}</TableCell>
                                 <TableCell align="right">{user.country}</TableCell>
                                 <TableCell align="right">{user.state}</TableCell>
                                 <TableCell align="right">{user.city}</TableCell>
                                 <TableCell align="right">                                 <button>Edit</button>
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
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
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/order');
                console.log(response, "fghjkl");
                setOrders(response?.data?.data?.docs);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">User Email</TableCell>
                            <TableCell align="right">orderDate</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((user) => (
                            <TableRow
                                key={user.userId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="right">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.orderDate}</TableCell>
                                <TableCell align="right">{user.state}</TableCell>
                                <TableCell align="right">{user.city}</TableCell>
                                <TableCell align="right">                              
                                 <button>Edit</button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Page
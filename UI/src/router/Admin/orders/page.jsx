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


import axios from 'axios';
import OrdersDetails from './OrdersDetails';

const Page = () => {
    const match = useRouteMatch();
    const history = useHistory();



    const [orders, setOrders] = useState([]);
    const navigateToOrderDetails = (user) => {
        console.log(orders, "data in function ");
        history.push({
            pathname: `${match.path}/ordersdetail`,
            state: { detailData: user }
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/order');
                setOrders(response?.data?.data?.docs);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);
    console.log(orders, "orderssss");
    return (
        <>
            <Switch>
                <Route path={match.path + "/ordersdetail"}>
                    <OrdersDetails />
                </Route>

                <Route path={match.path}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">User Name</TableCell>
                                    <TableCell align="right">User Email</TableCell>
                                    <TableCell align="right">orderDate</TableCell>
                                    <TableCell align="right">Items</TableCell>
                                    <TableCell align="right">Total</TableCell>
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
                                        <TableCell align="right">{user?.email}</TableCell>
                                        <TableCell align="right">{user?.orderDate}</TableCell>
                                        <TableCell align="right">{user?.products?.length}</TableCell>
                                        <TableCell align="right">{user?.subTotal}</TableCell>

                                            <TableCell align="right">
                                                <Button onClick={() => navigateToOrderDetails(user)}>Details</Button>
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
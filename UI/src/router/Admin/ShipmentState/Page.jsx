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
import EditShipmentstate from "./EditShipmentstate"

const Page = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [shipment, setShipment] = useState([]);

  useEffect(() => {
    const fetchReviews = () => {
      fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/shipment-rate-state/get-shipment-rate-state")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setShipment(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchReviews();
  }, []);
  console.log(shipment, "shipment");
  return (
    <>
      <Switch>
        <Route path={match.path + "/:id"}>
          <EditShipmentstate />
        </Route>
        <Route path={match.path}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '100px' }} align="right">state</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">state_code</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">postal</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">shipment_state_rate</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">shipment_delivery_message</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipment?.map((data) => (
                  <TableRow
                    key={data.userId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ width: '20%' }} component="th" scope="row" align="right">
                      {data.state}
                    </TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.state_code}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.postal}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.shipment_state_rate}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.shipment_delivery_message}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">
                      <Link to={`${match.path}/${data._id}`}>
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
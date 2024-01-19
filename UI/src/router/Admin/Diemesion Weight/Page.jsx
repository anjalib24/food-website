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
import EditdimensionWeight from "./EditdimensionWeight"
const Page = () => {
    const match = useRouteMatch();
    const [dimensionWeight, setdimensionWeightWeight] = useState([]);
    useEffect(() => {
        const fetchReviews = () => {
          fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/dimensions/get-product-weight-range-dimension")
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setdimensionWeightWeight(data.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
    
        fetchReviews();
      }, []);
      console.log(dimensionWeight,"hyjkl");
  return (
    <>
 <Switch>
        <Route path={match.path + "/:id"}>
          <EditdimensionWeight />
        </Route>
        <Route path={match.path}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '100px' }} align="right">Dimension</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">length</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">width</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">height</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">weight_range</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dimensionWeight?.map((data) => (
                  <TableRow
                    key={data.userId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ width: '20%' }} component="th" scope="row" align="right">
                      {data.dimensions}
                    </TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.length}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.width}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.height}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.weight_range}</TableCell>
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
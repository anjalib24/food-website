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
import { Add as AddIcon } from "@mui/icons-material";
import AddFreeZipCode from './AddFreeZipCode';
import Loader from '@/components/Loader';


const Page = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true); 
  const [zipcode, setZipcode] = useState([]);
  const location = useLocation()

  useEffect(() => {
    const fetchReviews = () => {
      setIsLoading(true);
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
        }).finally(() => {
          setIsLoading(false); 
        });
    };

    fetchReviews();
  }, [location]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Switch>
        <Route path={match.path + "/addfreeZipcode"}>
          <AddFreeZipCode />
        </Route>
        <Route path={match.path + "/:id"}>
          <EditFreeZipCode />
        </Route>
        <Route path={match.path}>
          <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
            <div>
              <h1 className="text-3xl font-medium">Free Zip Cods</h1>
            </div>
            <div>
              <Link to={match.path + "/addfreeZipcode"}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
                >
                  Add
                </Button>
              </Link>
            </div>
          </div>
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
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to={`${match.path}/${user._id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ opacity: 0.9 }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ opacity: 0.9 }}
                          onClick={() => {
                            setIsLoading(true);
                            fetch(import.meta.env.VITE_APP_BASE_API+`/api/v1/free-zip-codes/${user._id}`, {
                              method: 'DELETE',
                            })
                              .then(response => response.json())
                              .then(data => {
                                setZipcode(zipcode.filter(item => item._id !== user._id));
                              })
                              .catch((error) => {
                                console.error('Error:', error);
                              }).finally(() => {
                                setIsLoading(false); 
                              });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
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
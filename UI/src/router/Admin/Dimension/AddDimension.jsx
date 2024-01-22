import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper, Typography } from '@mui/material';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Box,
} from "@mui/material";

const AddDimension = () => {
    const [formData, setFormData] = useState({
        dimension: '',
        height: '',
        length: '',
        shipment_dimension_price: '',
        width: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_APP_BASE_API + '/api/v1/dimensions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setFormData(
                {
                    dimension: '',
        height: '',
        length: '',
        shipment_dimension_price: '',
        width: ''
                }
            )
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Paper className="w-full p-4 space-y-1">
                <Typography variant="h5" gutterBottom marginBottom={"20px"}>
                    <form onSubmit={handleSubmit} className="!my-4">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="dimension"
                                    label="dimension"
                                    value={formData.dimension}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="height"
                                    label="height"
                                    value={formData.height}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="length"
                                    label="length"
                                    value={formData.length}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="shipment_dimension_price"
                                    label="shipment_dimension_price"
                                    value={formData.shipment_dimension_price}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="width"
                                    label="width"
                                    value={formData.width}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Typography>
            </Paper>
        </>
    );
};

export default AddDimension;
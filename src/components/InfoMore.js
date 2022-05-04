import { Button, Container, Grid, Typography, Box, Collapse } from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react";

const InfoMore = ({ dataInfo }) => {

    // const { dataInfo } = useSelector((reduxdata) => reduxdata.taskReducer); // Lấy stata từ global
    console.log(dataInfo);

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <>
            <Container maxWidth='lg'>
                <Grid>
                    <Link to={`/`}>
                        <Button variant="ountlined" style={{ color: 'black', background: '#42adf1', margin: '10px 0px' }}> Quay lại </Button>
                    </Link>
                </Grid>
                <Collapse in={checked} collapsedSize={820} >
                    {
                        dataInfo.map((element, index) => {
                            return (
                                <Box className="weather_infomore" display='flex' gap='1rem' key={index}>
                                    <Grid container alignItems='center'>
                                        <Grid item xs={3} sm={4} textAlign='center'>
                                            {element.dt_txt}
                                        </Grid>
                                        <Grid item xs={3} sm={4} textAlign='center'>
                                            {element.weather[0].description}
                                        </Grid>
                                        <Grid item xs={3} sm={2} textAlign='center'>
                                            <Typography style={{ fontSize: '25px' }} > {Math.round(element.main.temp)}<sup>°C</sup></Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={2} textAlign='center'>
                                            <img src={require(`../assets/images/${element.weather[0].icon}.svg`)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        })
                    }
                </Collapse>
                {
                    checked ? <Grid container justifyContent='center'>
                        <Button onClick={handleChange} variant='outlined' style={{ color: 'black', background: '#42adf1', margin: '10px 0px' }} >
                            Show less
                        </Button>
                    </Grid>
                        :
                        <Grid container justifyContent='center'>
                            <Button onClick={handleChange} variant='outlined' style={{ color: 'black', background: '#42adf1', margin: '10px 0px' }} >
                                Show more
                            </Button>
                        </Grid>
                }
            </Container>
        </>
    )
}

export default InfoMore
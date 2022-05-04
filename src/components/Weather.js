import { Box, Container, Grid, TextField, Typography, InputAdornment, Button, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import './Weathor.css'
import { useEffect, useState } from "react";
import moment from "moment";
import InfoMore from "./InfoMore";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";


const Weather = ({ setDataInfo }) => {

    // Tạo full ngày
    let d = new Date();
    let Day = d.getDate();
    let Month = d.getMonth() + 1;
    let Year = d.getFullYear();
    let time = d.toLocaleTimeString('en-us');
    let fullDay = `${Day}/${Month}/${Year} - ${time}`;

    const API_KEY = '4815105dd1ca3680018524af600c54d8'; // Key API backend weather
    const [input, setInput] = useState(''); // state thu thập input
    const [cityName, setcityname] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')).name : ''); // state gán city Name
    const [description, setDescription] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')).weather[0].description : ''); // state gán mô tả thời tiết
    const [icon, setIcon] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')).weather[0].icon : ''); // state gán icon theo thời tiết
    const [temp, setTemp] = useState(sessionStorage.getItem('data') ? Math.round((JSON.parse(sessionStorage.getItem('data'))).main.temp) : ''); // State gán nhiệt độ
    const [humidity, setHumidity] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')).main.humidity : ''); // State gán độ ẩm
    const [wind, setWind] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')).wind.speed : ''); // State gán vs tốc độ gió
    const [sunrise, setSunrise] = useState(sessionStorage.getItem('data') ? moment.unix(JSON.parse(sessionStorage.getItem('data')).sys.sunrise).format(' h:mm a') : ''); // State gán mặt trời mọc
    const [sunset, setSunSet] = useState(sessionStorage.getItem('data') ? moment.unix(JSON.parse(sessionStorage.getItem('data')).sys.sunset).format(' h:mm a') : ''); // State gán mợi trời lặn

    // Alert
    const [alert, setAlert] = useState({
        status: false,
        severiry: 'success',
        message: ''
    })

    // Hàm tính 4 Day
    const getDay = (params) => {
        if ((new Date().getDay() + params) < 7) {
            return new Date().getDay() + params // trường hio75 < 0-6 thì gán bình thường
        } else {
            return new Date().getDay() + params - 7 // trường hợp > 0-6 thì - 7 để reset lại ngày, để nó tương ứng vs arr ngày/thứ
        }
    }

    // DAY 3
    let day1 = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][getDay(1)];
    const [day_1_icon, setDay_1_icon] = useState(sessionStorage.getItem('dataInfo') ? JSON.parse(sessionStorage.getItem('dataInfo')).list[9].weather[0].icon : '');
    const [day_1_temp, setDay_1_temp] = useState(sessionStorage.getItem('dataInfo') ? Math.round((JSON.parse(sessionStorage.getItem('dataInfo'))).list[9].main.temp) : '');

    // DAY 2
    let day2 = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][getDay(2)];
    const [day_2_icon, setDay_2_icon] = useState(sessionStorage.getItem('dataInfo') ? JSON.parse(sessionStorage.getItem('dataInfo')).list[17].weather[0].icon : '');
    const [day_2_temp, setDay_2_temp] = useState(sessionStorage.getItem('dataInfo') ? Math.round((JSON.parse(sessionStorage.getItem('dataInfo'))).list[17].main.temp) : '');

    // DAY 3
    let day3 = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][getDay(3)];
    const [day_3_icon, setDay_3_icon] = useState(sessionStorage.getItem('dataInfo') ? JSON.parse(sessionStorage.getItem('dataInfo')).list[25].weather[0].icon : '');
    const [day_3_temp, setDay_3_temp] = useState(sessionStorage.getItem('dataInfo') ? Math.round((JSON.parse(sessionStorage.getItem('dataInfo'))).list[25].main.temp) : '');

    // DAY 4
    let day4 = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][getDay(4)];
    const [day_4_icon, setDay_4_icon] = useState(sessionStorage.getItem('dataInfo') ? JSON.parse(sessionStorage.getItem('dataInfo')).list[33].weather[0].icon : '');
    const [day_4_temp, setDay_4_temp] = useState(sessionStorage.getItem('dataInfo') ? Math.round((JSON.parse(sessionStorage.getItem('dataInfo'))).list[33].main.temp) : '');

    // tạo promise xử lí bđb
    let fetchApi = async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data
    }

    // Tạo sự kiện search bằng Enter
    const onEnterSearch = (event) => {
        let check = true
        if (!isNaN) {
            return false
        }

        if (event.key === 'Enter') {
            // Lấy link api weather hiện tại
            fetchApi(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric&lang=vi`)
                .then((data) => {
                    console.log(data);
                    setcityname(data.name);
                    setDescription(data.weather[0].description);
                    setIcon(data.weather[0].icon)
                    setTemp(Math.round(data.main.temp))
                    setHumidity(data.main.humidity)
                    setWind(data.wind.speed)
                    setSunrise(moment.unix(data.sys.sunrise).format(' h:mm a'))
                    setSunSet(moment.unix(data.sys.sunset).format('h:mm a'))
                    sessionStorage.setItem('data', JSON.stringify(data));
                    setAlert({
                        status: true,
                        severiry: 'success',
                        message: 'Thành công'
                    })
                })
                .catch((error) => {
                    setAlert({
                        status: true,
                        severiry: 'error',
                        message: 'Thành phố chưa đúng'
                    })
                })
            // Lấy link api weather 10 ngày sau
            fetchApi(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&APPID=${API_KEY}&units=metric&lang=vi`)
                .then((data) => {
                    console.log(data);
                    setDay_1_icon(data.list[9].weather[0].icon);
                    setDay_1_temp(Math.round(data.list[9].main.temp));

                    setDay_2_icon(data.list[17].weather[0].icon);
                    setDay_2_temp(Math.round(data.list[17].main.temp));

                    setDay_3_icon(data.list[25].weather[0].icon);
                    setDay_3_temp(Math.round(data.list[25].main.temp));
                    //33 n
                    setDay_4_icon(data.list[33].weather[0].icon);
                    setDay_4_temp(Math.round(data.list[33].main.temp));

                    setDataInfo(data.list); // Lấy data để map toàn bộ vs trang chi tiết
                    sessionStorage.setItem('dataInfo', JSON.stringify(data)); // Tạo storage đưa lên application
                })
        }
    }
    // Tạo sự kiện search bằng Click
    const onClickSearch = () => {
        fetchApi(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric&lang=vi`)
            .then((data) => {
                console.log(data);
                setcityname(data.name);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon)
                setTemp(Math.round(data.main.temp))
                setHumidity(data.main.humidity)
                setWind(data.wind.speed)
                setSunrise(moment.unix(data.sys.sunrise).format(' h:mm a'))
                setSunSet(moment.unix(data.sys.sunset).format('h:mm a'))
                sessionStorage.setItem('data', JSON.stringify(data));
                setAlert({
                    status: true,
                    severiry: 'success',
                    message: 'Thành công'
                })
            })
            .catch((error) => {
                setAlert({
                    status: true,
                    severiry: 'error',
                    message: 'Thành phố chưa đúng'
                })
            })
        // Lấy link api weather 10 ngày sau
        fetchApi(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&APPID=${API_KEY}&units=metric&lang=vi`)
            .then((data) => {
                console.log(data);
                setDay_1_icon(data.list[9].weather[0].icon);
                setDay_1_temp(Math.round(data.list[9].main.temp));

                setDay_2_icon(data.list[17].weather[0].icon);
                setDay_2_temp(Math.round(data.list[17].main.temp));

                setDay_3_icon(data.list[25].weather[0].icon);
                setDay_3_temp(Math.round(data.list[25].main.temp));
                //33 n
                setDay_4_icon(data.list[33].weather[0].icon);
                setDay_4_temp(Math.round(data.list[33].main.temp));

                setDataInfo(data.list); // Lấy data để map toàn bộ vs trang chi tiết
                sessionStorage.setItem('dataInfo', JSON.stringify(data)); // Tạo storage đưa lên application
            })
    }

    return (
        <>
            <Container maxWidth='xxl' className="weather_">
                <Grid className="weather_border">
                    {/* Title */}
                    <Grid className="weather_post">
                        <img
                            src={'https://cdn-icons-png.flaticon.com/512/1163/1163712.png'}
                            alt='weather'
                            width='15%'
                        />
                        <Typography variant="h3">
                            <span>Weather Forecast</span>
                        </Typography>
                    </Grid>
                    {/* TextField */}
                    <Grid className="weather_input" padding='10px'>
                        <TextField
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={onClickSearch}>
                                            <SearchIcon />
                                        </IconButton>

                                    </InputAdornment>
                                ),
                            }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="weather_input-size"
                            placeholder="Nhập chính xác tên thành phố"
                            onKeyDown={onEnterSearch}
                        />
                    </Grid>
                    {/* Show Info */}
                    <Grid className="info_">
                        {
                            cityName ? <Typography className="info-title">{fullDay} </Typography> : null
                        }
                        {
                            cityName ?
                                <Grid className="info_show">
                                    <Typography className="info-name"> {cityName} </Typography> <span>/</span>
                                    <Typography className="info-state">{description} </Typography> <span>/</span>
                                    {
                                        icon ? <img alt="weather2" src={require(`../assets/images/${icon}.svg`)} /> : null
                                    }
                                    <span>/</span>
                                    <Typography className="info-temp"> {temp}<sup>°C</sup></Typography>
                                </Grid>
                                : null
                        }
                        {
                            cityName ?
                                <Grid className="info_show-1">
                                    <Grid>
                                        <Typography className="info_show-1-label"> MT mọc  </Typography>
                                        <Typography className="info_show-1-text">{sunrise} </Typography>
                                        <Typography className="info_show-1-label"> Độ ẩm </Typography>
                                        <Typography className="info_show-1-text">{humidity} % </Typography>
                                    </Grid>
                                    <Grid >
                                        <Typography className="info_show-1-label"> MT lặn  </Typography>
                                        <Typography className="info_show-1-text"> {sunset}  </Typography>
                                        <Typography className="info_show-1-label"> Gió  </Typography>
                                        <Typography className="info_show-1-text"> {wind} m/s  </Typography>
                                    </Grid>

                                </Grid>
                                : null
                        }
                        {
                            cityName ?
                                <Grid padding='10px' margin='10px'>
                                    <Link to={`/Info`} >
                                        <Button variant="outlined" style={{ color: 'black' }}> Xem thêm chi tiết </Button>
                                    </Link>
                                </Grid>
                                : null
                        }
                    </Grid>
                </Grid>

                {/* Show 4day */}
                {
                    cityName ?
                        <>
                            <Grid className="weather_4day_">
                                <Grid className="weather_4day-border">
                                    <Typography variant="h5"> {day1} </Typography>
                                    {
                                        day_1_icon ? <img src={require(`../assets/images/${day_1_icon}.svg`)} alt="day1" /> : null
                                    }
                                    <Typography> {day_1_temp}<sup>°C</sup> </Typography>
                                </Grid>
                                <Grid className="weather_4day-border">
                                    <Typography variant="h5"> {day2} </Typography>
                                    {
                                        day_2_icon ? <img src={require(`../assets/images/${day_2_icon}.svg`)} alt="day2" /> : null
                                    }
                                    <Typography> {day_2_temp}<sup>°C</sup> </Typography>
                                </Grid>
                                <Grid className="weather_4day-border">
                                    <Typography variant="h5"> {day3} </Typography>
                                    {
                                        day_3_icon ? <img src={require(`../assets/images/${day_3_icon}.svg`)} alt="day3" /> : null
                                    }
                                    <Typography> {day_3_temp}<sup>°C</sup> </Typography>
                                </Grid>
                                <Grid className="weather_4day-border">
                                    <Typography variant="h5"> {day4} </Typography>
                                    {
                                        day_4_icon ? <img src={require(`../assets/images/${day_4_icon}.svg`)} alt="day4" /> : null
                                    }
                                    <Typography> {day_4_temp}<sup>°C</sup> </Typography>
                                </Grid>
                            </Grid>
                        </>
                        : null
                }


            </Container>
            <Grid style={{
                fontSize: '11px',
                textAlign: 'center',
                fontFamily: 'cursive',
                fontStyle: 'italic'
            }}> Made by ntd96</Grid>

            <Alerts alert={alert} setAlert={setAlert} />
        </>
    )
}

export default Weather
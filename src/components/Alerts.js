import { Snackbar, Alert, Slide } from "@mui/material"

function Alerts({alert, setAlert}) {

    // Hiển thị chiều Up
    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert(false);
      };


    return (
        <>
            <Snackbar open={alert.status} autoHideDuration={3000} onClose={handleClose} TransitionComponent={TransitionUp} >
                <Alert onClose={handleClose} severity={alert.severiry} sx={{ width: '100%' }} >
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Alerts
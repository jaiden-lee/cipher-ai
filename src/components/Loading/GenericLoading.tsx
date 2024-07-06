import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// Use MaterialUI for loading bars

function GenericLoading() {
    return (
        <Box sx={{ width: '100%' }} className="absolute">
            <LinearProgress />
        </Box>
    );
}

export default GenericLoading;
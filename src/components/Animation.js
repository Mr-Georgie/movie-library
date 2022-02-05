import { LoopCircleLoading } from 'react-loadingg'

const styles = {
    marginTop: "15px",
}

const LoadingContainer = () => {
    return (
        <div className='no-movie-found'>
        <LoopCircleLoading size="large" style={styles}/>;
        </div>
    )
}

export default LoadingContainer
import { LoopCircleLoading } from 'react-loadingg'

const styles = {
    marginTop: "15px",
}

const LoadingContainer = () => {
    return (
        <div className='no-movie-found'>
        <LoopCircleLoading size="large" color="#9C92F8" style={styles}/>;
        </div>
    )
}

export default LoadingContainer
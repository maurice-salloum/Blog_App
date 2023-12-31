import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {

    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }



    return (
        <p title={timestamp} className='text-right' >
            &nbsp; <i>{timeAgo}</i>
        </p>
    )
}



export default TimeAgo 
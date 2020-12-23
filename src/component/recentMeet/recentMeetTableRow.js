import { withRouter } from 'react-router-dom';

function RecentMeetTableRow({ data }) {

    const winRate = Math.round(data.win / (data.win + data.lose) * 100)

    let name = data.name

    function getByte(str) {
        return str
            .split('')
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
    }

    if (getByte(name) > 10) {
        name = name.substring(0, 5) + '...'
    }

    return (
        <tr>
            <td className='meetTableName' onClick={(e) => {
                e.preventDefault()
                window.location.replace('/result/' + data.name)
            }
            }>{name}</td>
            <td>{data.count}</td>
            <td>{data.win}</td>
            <td>{data.lose}</td>
            <td>{winRate + '%'}</td>
        </tr>
    )
}

export default withRouter(RecentMeetTableRow)
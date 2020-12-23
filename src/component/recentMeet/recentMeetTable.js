import RecentMeetTableRow from "./recentMeetTableRow"

function RecentMeetTable({ meet }) {

    let meetdata = JSON.parse(JSON.stringify(meet))
    let result = []

    for (let n in meet) {

        let highCount = 1
        let highCountName = ''

        for (let user in meetdata) {
            if (meetdata[user].count === 1) {
                continue
            } else if (meetdata[user].count > highCount) {
                highCount = meetdata[user].count
                highCountName = user
            }
        }

        if (highCount !== 1)
            result.push(meetdata[highCountName])

        delete meetdata[highCountName]
    }

    const meetTableRow = result.map((data) => {
        return <RecentMeetTableRow key={data.name} data={data} />
    })

    return (
        <table>
            <thead>
                <tr>
                    <th className='meetTableTitle' colSpan='5'>
                        같은 팀으로 게임한 소환사들
                </th>
                </tr>
                <tr className='meetTableSubtitle'>
                    <th className='meetTableSubName'>닉네임</th>
                    <th className='meetTableSubth'>판수</th>
                    <th className='meetTableSubth'>승리</th>
                    <th className='meetTableSubth'>패배</th>
                    <th className='meetTableSubWinRate'>승률</th>
                </tr>
            </thead>
            <tbody>
                {meetTableRow}
            </tbody>
        </table>
    )
}
export default RecentMeetTable
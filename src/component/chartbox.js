import { useSelector } from 'react-redux'
import ChartTr from './chartTr'

function Chartbox({ matches }) {

    const store = useSelector(state => state)
    const user = store.user

    let chart = []
    let chartData = {}
    let chartArr = []

    matches.forEach(match => {

        let playerIndex = 0


        for (let i = 0; i < 10; i++) {
            if (match.participantIdentities[i].player.summonerName === user.name) {
                playerIndex = i
                break
            }
        }
        let playerTeam = 0
        if (playerIndex > 5) playerTeam = 1

        let win = 0
        let lose = 1
        if (match.teams[playerTeam].win === 'Win') {
            win = 1
            lose = 0
        }

        const championId = match.participants[playerIndex].championId
        const championName = store.gameData.champion[championId].name

        const kills = match.participants[playerIndex].stats.kills
        const deaths = match.participants[playerIndex].stats.deaths
        const assists = match.participants[playerIndex].stats.assists

        if (chartData[championName] === undefined) {
            chartData[championName] = {
                name: championName,
                count: 1,
                win: win,
                lose: lose,
                kills: kills,
                deaths: deaths,
                assists: assists
            }
        } else {
            chartData[championName].count += 1
            chartData[championName].win += win
            chartData[championName].lose += lose
            chartData[championName].kills += kills
            chartData[championName].deaths += deaths
            chartData[championName].assists += assists
        }
    })

    let temp = JSON.parse(JSON.stringify(chartData))

    for (let n in chartData) {
        let highCount = 0
        let highCountName = ''
        for (let key in temp) {
            if (temp[key].count > highCount) {
                highCount = temp[key].count
                highCountName = key
            }
        }
        delete temp[highCountName]
        chart.push(chartData[highCountName])
    }

    chartArr = chart.map((data) => {
        return <ChartTr key={data.name} data={data} />
    })

    return (
        <div className='chartbox'>
            <button onClick={(e) => {
                e.preventDefault()
                console.log(chart)
            }}>

            </button>
            <table>
                <tbody>
                    {chartArr}
                </tbody>
            </table>
        </div>
    )
}

export default Chartbox

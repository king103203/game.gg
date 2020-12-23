import { useSelector } from 'react-redux'

export function TooltipBoxItem({ item }) {

    const store = useSelector(state => state)
    const description = store.gameData.item[item].description

    let itemName = store.gameData.item[item].name
    let plainText = store.gameData.item[item].plaintext

    const totalGold = store.gameData.item[item].gold.total
    const sellgold = store.gameData.item[item].gold.sell

    const description_stats = description.substring(
        description.indexOf('<stats>'),
        description.indexOf('</stats>')
    ).split("<br>")

    const description_other = description.substring(
        description.indexOf('</stats>'),
        description.length
    ).split("<br>")

    const descriptionParser = (arr) => {
        let new_strArr = []
        arr.forEach((str) => {

            let isClose = false
            let strArr = str.split("")
            let tempStr = ''

            for (let i = 0; i < strArr.length; i++) {

                if (strArr[i] === '<' || strArr[i] === '>') {
                    isClose = !isClose
                    continue
                }

                if (!isClose) {
                    tempStr += strArr[i]
                }
            }

            tempStr = tempStr.replace('  ', ' ')
            if (tempStr !== '')
                new_strArr.push(tempStr)
        })
        return new_strArr
    }

    const stats = descriptionParser(description_stats).map((str, i) => {
        return <li key={item + 'stats' + i}>{str}</li>
    })
    const other = descriptionParser(description_other).map((str, i) => {
        return <li key={item + 'other' + i}><br />{str}</li>
    })

    return (
        <div className="tooltipBox">
            <ul>
                <li className='tooltipName'>{itemName}</li>
                <li>{plainText}</li>
                {stats.length === 0 ? null : <br />}
                {stats}
                {other}
                {totalGold === 0 ? null : <br />}
                {totalGold === 0 ? null : <li>{'골드 : ' + totalGold + '(' + sellgold + ')'}</li>}
            </ul>
            <div className='tootipBoxSharp'></div>
        </div>
    )
}

export function TooltipBoxSpell({ type, data }) {

    let description = ''
    const spellName = data.name

    if (type === 'spell') description = data.description
    else if (type === 'rune' && data.longDesc !== undefined) {
        const strArr = data.longDesc.split('')
        let tempStr = ''
        let isClose = false
        for (let i = 0; i < strArr.length; i++) {

            if (strArr[i] === '<' || strArr[i] === '>') {
                isClose = !isClose
                continue
            }

            if (!isClose) {
                tempStr += strArr[i]
            }
        }

        tempStr = tempStr.replace('  ', ' ')
        description = tempStr
    }

    return (
        <div className="tooltipBox">
            <ul>
                <li className='tooltipName'>{spellName}</li>
                <li>{description}</li>
            </ul>
            <div className='tootipBoxSharp'></div>
        </div>
    )
}

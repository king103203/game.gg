import React from 'react';
import Itembox from './itembox'

function ItemTemplate({ items }) {

    // const itembox = items.map((item) => {
    //     return <Itembox key={item} item={item} />
    // })

    const itembox = []
    for (let i = 0; i < 6; i++) {
        if (items[i] !== 0)
            itembox.push(<Itembox key={items[i]} item={items[i]} />)
        else itembox.push(<div key={i} className='itemBlank'></div>)
    }

    const isDoubleLine = 'DoubleLine'

    return (
        <div className='itemTemplate'>
            <div className={isDoubleLine}>
                {itembox}
            </div>
            <Itembox key={items[6]} item={items[6]} />
        </div>
    )
}

export default ItemTemplate;

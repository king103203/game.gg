import React from 'react';
import ItemBox from './itemBox'

function ItemTemplate({ type, items }) {

    let itemBox_0_to_5 = []
    const itemBox_6 = <ItemBox item={items[6]} />

    for (let i = 0; i < 6; i++) itemBox_0_to_5.push(<ItemBox item={items[i]} />)

    return (
        <div className='itemTemplate'>
            <div className={'item_0_to_5 ' + type}>
                {itemBox_0_to_5}
            </div>
            {itemBox_6}
        </div>
    )
}

export default ItemTemplate;

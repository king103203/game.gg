function gamebox(props) {

    const match = props.match

    return (
        <div>
            {match.gameId}
        </div>
    )
}

export default gamebox;

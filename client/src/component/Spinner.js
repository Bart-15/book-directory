import React from 'react'
import {css} from '@emotion/react'
import CircleLoader from 'react-spinners/CircleLoader'


const Spinner = (loading) => {
    const override = css`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    border-color: red;
    `;


    return (
        <div>
            <CircleLoader css={override} size={150} loading={loading} color={"#333"} speedMultiplier={1.5} />
        </div>
    )
}

export default Spinner;
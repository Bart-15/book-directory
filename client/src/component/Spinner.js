import React from 'react'
import {css} from '@emotion/react'
import MoonLoader from 'react-spinners/MoonLoader'


const Spinner = (loading) => {
    const override = css`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    border-color: red;
    `;


    return (
        <div>
            <br/>
            <br />
            <MoonLoader	 css={override} size={150} loading={loading} speedMultiplier={1.5} />
        </div>
    )
}

export default Spinner;
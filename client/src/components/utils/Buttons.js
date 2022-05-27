import './Buttons.css'

import { useState } from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

export const SaveButton = (props) => {
    return (
        <span>
            {props.saved ? (
                <AiFillStar onClick={() => props.setSaved(!props.saved)} class="save-button"/>
            ) : (
                <AiOutlineStar onClick={() => props.setSaved(!props.saved)} class="save-button"/>
            )}
        </span>
    )
}
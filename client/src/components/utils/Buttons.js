import './Buttons.css'

import { useState } from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

export const SaveButton = () => {
    const [saved, setSaved] = useState(false)

    return (
        <span>
            {saved ? (
                <AiFillStar onClick={() => setSaved(!saved)} class="save-button"/>
            ) : (
                <AiOutlineStar onClick={() => setSaved(!saved)} class="save-button"/>
            )}
        </span>
    )
}
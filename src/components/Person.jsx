import React, { useState } from 'react'


export default function Person({person, onClick, color, index}, props) {
    let orange = '#e58c45';
    let grey = '#f5f5f5';

    const [buttonColor, setButtonColor] = useState(orange)

    const handleColorChange = (e) => {
        e.preventDefault();
        const button = e.target.style.backgroundColor;
        const newButton = e.target.style.backgroundColor;

        const newColor = buttonColor === orange ? grey : orange
        setButtonColor(newColor) 
    }
    return (
        <>
            <button
                style={{backgroundColor: buttonColor}}
                color={buttonColor}
                onClick={handleColorChange}
                name={person.person}
                index={index}
            >
               {props.person}
            </button>
           
        </>
    )
}

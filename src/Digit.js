import React from "react"

export default function Digit({ digit, handelDigit }){
    return <button onClick={() => handelDigit(digit)}>{digit}</button>
}
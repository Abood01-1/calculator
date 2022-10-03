import React, { useEffect, useState } from "react"
import "./App.css"
import Digit from "./Digit"


const App = () => {
  const [currentAndPrevios, setCurrentAndPrevios] = useState({current : "", previos : ""})
  // const [previos, setPrevios] = useState("")

  function handelDigit(digit){
    if(digit === "." && currentAndPrevios.current.includes(".")) return

    setCurrentAndPrevios({
      ...currentAndPrevios,
        current : currentAndPrevios.current + digit
    })

    if(digit === "-" || digit === "+" || digit === "/" || digit === "*"){

      if(digit === "-" && currentAndPrevios.current === ""){
        setCurrentAndPrevios({
          ...currentAndPrevios,
          current:currentAndPrevios.current + digit,
          previos : currentAndPrevios.previos
        })
      }
      
      else if(currentAndPrevios.previos === "" && currentAndPrevios.current === ""){
        setCurrentAndPrevios({
          current : "",
          previos : ""
        })
      }
      else if(currentAndPrevios.previos !== "" && currentAndPrevios.current === ""){
        setCurrentAndPrevios({
          current : "",
          previos : currentAndPrevios.previos
        })
      }

      else if(currentAndPrevios.current !=="" && currentAndPrevios.previos === ""){
        setCurrentAndPrevios({
          ...currentAndPrevios,
          current:"",
          previos : `${currentAndPrevios.current} ${digit}`
        })
      }

      else if(currentAndPrevios.current !=="" && currentAndPrevios.previos !== ""){
        setCurrentAndPrevios({
          ...currentAndPrevios,
          current:"",
          previos : evaluation(currentAndPrevios, digit)
        })
      }

      
    }
  }

  function clearDigits(){
    setCurrentAndPrevios({
      current : "",
      previos : ""
    })
  }

  function deleteDigit(){
    if(currentAndPrevios.current) 
    return setCurrentAndPrevios({
      ...currentAndPrevios,
      current : currentAndPrevios.current.slice(0, -1)
    })
    
  }
  
  function evaluation(currentAndPrevios, digit){
    
    let cur = parseFloat(currentAndPrevios.current)
    let pre = parseFloat(currentAndPrevios.previos.split(" ")[0])
    let operation = currentAndPrevios.previos.split(" ")[1]
    let total 
    if(isNaN(pre) || isNaN(cur)) return ""

    switch(operation){
      case "-" :
        total =  pre - cur
        break

      case "+" :
        total =  pre + cur
        break

      case "/" :
        total =  pre / cur
        break

          case "*" :
        total =  pre * cur
        break
      
      default :
        return
    }
    if(digit === "equal") {
      return setCurrentAndPrevios({
        current : total,
        previos : ""
      })
    }
    return `${total.toString()} ${digit}`

  }
 
  
  return (
    <div className="App">
       <div className="calculator">
        <div className="output">
          <div className="previos">{currentAndPrevios.previos}</div>
          <div className="current">{currentAndPrevios.current}</div>
        </div>
        <button className="span-tow" onClick={clearDigits}>AC</button>
        <button onClick={deleteDigit}>DEL</button>
        <Digit handelDigit={handelDigit} digit={"/"} />
        <Digit handelDigit={handelDigit} digit={"1"} />
        <Digit handelDigit={handelDigit} digit={"2"} />
        <Digit handelDigit={handelDigit} digit={"3"} />
        <Digit handelDigit={handelDigit} digit={"*"} />
        <Digit handelDigit={handelDigit} digit={"4"} />
        <Digit handelDigit={handelDigit} digit={"5"} />
        <Digit handelDigit={handelDigit} digit={"6"} />
        <Digit handelDigit={handelDigit} digit={"-"} />
        <Digit handelDigit={handelDigit} digit={"7"} />
        <Digit handelDigit={handelDigit}t digit={"8"} />
        <Digit handelDigit={handelDigit}t digit={"9"} />
        <Digit handelDigit={handelDigit} digit={"+"} />
        <Digit handelDigit={handelDigit} digit={"."} />
        <Digit handelDigit={handelDigit} digit={"0"} />
        <button className="span-tow" onClick={() => evaluation(currentAndPrevios, "equal")}>=</button>
      </div>
     
    </div>
  )
}

export default App;
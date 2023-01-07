import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [reds, setReds] = useState(["ball", "bat", "tennis"]);
  const [blues, setBlues] = useState(["cricket", "sports", "football", "NBA"]);
  const [greens, setGreens] = useState(["worldcup", "IPL"]);
  const [blacks, setBlacks] = useState(["FIFA", "India", "Hockey"]);

  const add = (stack) => {
    console.log(stack);
    if (stack.length < 8) {
      stack.push("New Item");
      setReds([...reds]);
      setBlues([...blues]);
      setGreens([...greens]);
      setBlacks([...blacks]);
    } else {
      alert("Maximum stack limit reached");
    }
  };
  const remove = (stack, index) => {
    stack.splice(index,1);
    setReds([...reds]);
    setBlues([...blues]);
    setGreens([...greens]);
    setBlacks([...blacks]);
  };

  const change = (e,stack) =>{
    stack[e.target.name] = e.target.value;
    setReds([...reds]);
    setBlues([...blues]);
    setGreens([...greens]);
    setBlacks([...blacks]);
  }
 
  const dragstart =(e,data,i) =>{
    e.dataTransfer.setData('data',data);
    e.dataTransfer.setData('delIndex',i);
  }
  const drop =(e,stack)=>{
    let data = e.dataTransfer.getData('data');
    let delIndex = e.dataTransfer.getData('delIndex');
    let setIndex = e.dataTransfer.getData('setIndex')
    stack.splice(setIndex,0,data)
    stack.splice(delIndex,1);
    console.log(stack)
    setReds([...reds]);
  }
  const dragover =(e,index) =>{
    e.preventDefault();
    e.dataTransfer.setData('setIndex',index)
  }

  return (
    <div className="container">
      <div className="red stack">
        Red
        <button onClick={() => add(reds)}>Add</button>
        <div className="list" onDrop={(e)=>drop(e,reds)} onDragOver={(e)=>dragover(e)} >
          {reds.map((red, i) => {
            return (
              <div className="drag-content" key={i} draggable onDragStart={(e)=>dragstart(e,red,i)} onDragOver={(e)=>dragover(e,i)} >
                <input value={reds[i]} name={i.toString()} onChange={(e)=>change(e,reds)}  />
                <div className="close" onClick={() => remove(reds, i)}>
                  X
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* blue stack */}
      <div className="blue stack">
        Blue
        <button onClick={() => add(blues)}>Add</button>
        <div className="list">
          {blues.map((blue, i) => {
            return (
              <div className="drag-content" key={i} draggable>
              <input value={blues[i]} name={i.toString()} onChange={(e)=>change(e,blues)}  />
                <div className="close" onClick={() => remove(blues, i)}>X</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* green stack */}
      <div className="green stack">
        Green
        <button onClick={() => add(greens)}>Add</button>
        <div className="list">
          {greens.map((green, i) => {
            return (
              <div className="drag-content" key={i} draggable>
              <input value={greens[i]} name={i.toString()} onChange={(e)=>change(e,greens)} />
                <div className="close" onClick={() => remove(greens, i)}>X</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* black stack */}
      <div className="black stack">
        Black
        <button onClick={() => add(blacks)}>Add</button>
        <div className="list">
          {blacks.map((black, i) => {
            return (
              <div className="drag-content" key={i} draggable>
              <input value={blacks[i]} name={i.toString()} onChange={(e)=>change(e,blacks)}  />
                <div className="close" onClick={() => remove(blacks, i)}>X</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;

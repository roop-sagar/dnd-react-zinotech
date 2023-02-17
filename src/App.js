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
 
  const dragstart =(e,data,stack,i) =>{
    e.dataTransfer.setData('data', data);
    e.dataTransfer.setData('dragStack', stack);
    e.dataTransfer.setData('oldStackIndex',i);
    stack.splice(i,1);
    console.log(stack);
  }
  const drop =(e,stack,fn)=>{
    console.log(fn);
    e.preventDefault();
    let data=e.dataTransfer.getData('data');
    let oldStack = e.dataTransfer.getData('dragStack');
    let oldStackIndex = e.dataTransfer.getData('oldStackIndex');
    if(stack.length<8){
      stack.splice(e.target.id,0,data)
    } else {
      oldStack.splice(oldStackIndex,0,data)
      alert('stack limit exceeded')
    }
    setReds([...reds]);
    setBlues([...blues]);
    setGreens([...greens]);
    setBlacks([...blacks]);
    console.log(stack);
  }
  const dragover =(e,index) =>{
    e.preventDefault();
    console.log(e.target);
    setReds([...reds]);
    setBlues([...blues]);
    setGreens([...greens]);
    setBlacks([...blacks]);
  }

  return (
    <div className="container">
      <div className="red stack">
        Red
        <button onClick={() => add(reds)}>Add</button>
        <div className="list" id="reds" onDrop={(e)=>drop(e,reds,(didDrop)=>{console.log(didDrop)})} onDragOver={(e)=>dragover(e)} >
          {reds.map((red, i) => {
            return (
              <div className="drag-content" key={i} id={i} draggable onDragStart={(e)=>dragstart(e,red,reds,i)}>
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
        <div className="list" id="blue" onDrop={(e)=>drop(e,blues)} onDragOver={(e)=>dragover(e)} >
          {blues.map((blue, i) => {
            return (
              <div className="drag-content" key={i} id={i} draggable onDragStart={(e)=>dragstart(e,blue,blues,i)}>
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

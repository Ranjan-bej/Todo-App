import { useState , useEffect } from 'react'
import './App.css'

function App() {

  const getLocaldata = ()=>{
    const lists = localStorage.getItem("tasks");
    if(lists){
      return JSON.parse(lists);
    }
    else{
      return [];
    }
  }
  const [editItem,setEditItem] = useState("");
  const [items,setItems]=useState(getLocaldata());
  const [input,setInput]=useState("");
  const [toggle,setToggle]=useState(false);

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(items));
  },[items])
  const add =()=>{
    if(input===""){
      alert("Please enter the task");
    }
    else if(input !== "" && toggle){
      setItems(items.map((currElement)=>{
        if(currElement.id===editItem){
          return {...currElement,name:input};
        }
        return currElement;
      }))

      setInput("");
      setToggle(false);
    }
    else{
      const inputItem ={
        name:input,
        id:new Date().getTime().toString()
      }
      setItems([...items,inputItem]);
      setInput("");
    }
  }

  const removeAll =()=>{
    setItems([]);
  }

  const deleteItem=(index)=>{
    const itemsAfterDelete= items.filter((currElement)=>{
        return currElement.id !== index;
      })
    setItems(itemsAfterDelete);
  }

  const edit = (element)=>{
    setToggle(true);
    setEditItem(element.id);
    setInput(element.name);
  }
  return (
    <>
    {/*  Heading */}
      <div className="heading">
        <h1>ToDo App</h1>
      </div>

      {/* Input And Add */}
      <div className='inputBox'>
        <input type="text" onChange={(event)=>setInput(event.target.value)} placeholder='✍️ Enter you work' className="inputText" value={input}/>
        {toggle?<i className="fa-solid fa-pen-to-square edit" onClick={add}></i>:<i className="fa-solid fa-plus inputAdd" onClick={add}></i>}
        
      </div>

      {/* Todo items */}
      {items.map((currElement)=>{
        return <div key={currElement.id}>
        <div className='items'>
        <div className="itemText">
          {currElement.name}
        </div>
        <div className="itemIcons">
        <i className="fa-solid fa-pen-to-square edit" onClick={()=>edit(currElement)}></i>
        <i className="fa-regular fa-trash-can delete" onClick={()=>deleteItem(currElement.id)}></i>
        </div>
      </div>
      </div>
      })}
      
      

      {/* Remove All */}
      <button className='removeAll' onClick={removeAll}>Remove All</button>
    </>
  )
}

export default App

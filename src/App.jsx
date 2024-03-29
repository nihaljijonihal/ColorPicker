import { Button, Col, Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

import defaultImage from  './defaultImage.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import { SketchPicker } from 'react-color';

function App() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [input,setInput] = useState(null)
  const [color,setColor] = useState("#000000")
  console.log(input);
  const handleInput = (data) =>{
    
    setInput(URL.createObjectURL(data))
    console.log(data);
   
  }

  const openEyeDropper = async () => {
    let eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setColor(sRGBHex);
    console.log(color);
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
    toast(`Copied ${color} to clipboard!`);
  };
  const handleDragOver =(event) =>{
    event.preventDefault()
  }
  const handleDrop =(event) =>{
    event.preventDefault()
    //console.log(event.dataTransfer.files[0]);
    //setInput(event.dataTransfer.files[0]);
    setInput(URL.createObjectURL(event.dataTransfer.files[0]));
  }

  return (

    <>  
    <h1 id='headding' style={{fontFamily:" 'Brush Script MT', cursive",fontSize:"10rem",overflow:"hidden"}} onClick={ handleClose}  className='d-flex w-100 justify-content-center mt-3 mb-5' >Color picker </h1>
 
   <div style={{width:"100%"}}  >
      <Row style={{width:"100%"}} className='w-100 mt-2'>
      <Col lg={"1"}></Col>
        <Col   lg={"4"} className='d-flex flex-column '  >

        

           
              <div onClick={handleShow} style={{ fontSize: "1.9rem" }} className=" btn btn-warning p-3 d-flex justify-content-center align-items-center fw-bolder mb-5" >
              Color Picker
               
            
            </div>
           






            <input onClick={handleClose}  onChange={(e)=>handleInput(e.target.files[0])} style={{display:"none"}} type="file" id='fileInput'  class="btn btn-secondary border boreder-primary" /> 
            <label for="fileInput">
              <div style={{ fontSize: "1.9rem" }} className=" btn btn-primary p-3 d-flex justify-content-center align-items-center fw-bolder" >
              Select a File
              <i class="fa-solid fa-file-circle-plus ms-2 "></i> 
            
            </div>
            </label>
            
            
            

          <Button style={{ fontSize: "1.9rem" }} className='mt-5 mb-5 p-3 w-100 btn-info  fw-bolder' onClick={openEyeDropper}>
            Open Eyedropper 
          <i  className="fa-solid fa-eye-dropper ms-2"></i>
          </Button>

    

          <div onClick={handleCopyColor} className='d-flex justify-content-center align-items-center text-dark fs-2 w-100  rounded' style={{backgroundColor:color,height:"15rem",cursor:"pointer"}}>
            
            {color} 
            <i className="fa-regular fa-copy ms-2" style={{ fontSize: "1.9rem" }}></i>
              </div>

         
  
  
        

        </Col>

        <Col lg={"1"}></Col>


        <Col onDragOver={handleDragOver} onDrop={handleDrop} lg={"5"} className='d-flex justify-content-center align-items-center m-5 rounded border-secondary p-4' style={{border:"3px dashed white"}} >
          
          {show? 
          <SketchPicker  width='50%' color={color} onChange={e=>setColor(e.hex)}/>
          :

          <div>
            
               
                {input===null&&<div className='d-flex align-items-center justify-content-center text-warning fs-5 mb-3' style={{fontSize:"10rem"}}> Drag & Drop an image here.</div>}
                <img className='img-fluid' src={input} alt=" Nothing to display yet.." />
            
          </div>
            
            
          }

          {/* <div className='d-flex align-items-center justify-content-center text-warning fs-5' style={{fontSize:"10rem"}}> Select an image to pick from.</div> */}


          


        </Col>



        <Col lg={"1"}></Col>
      </Row>
   </div>


   



   <ToastContainer />
    </>
  )
}

export default App

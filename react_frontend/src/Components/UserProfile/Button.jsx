import React from "react";
import "./user_profile.css";


var deleteUserEndPoint = "http://127.0.0.1:8091/deleteUser"

function Button() {
    
  //mora bit function ne klasas
  // useEffect(() => {
  //     import('./sidebar.css');
  // })

  const onClickDelete = () => {
    console.log("Delete");

    fetch(deleteUserEndPoint,{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result)              
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              console.log(error)
          }
      )
  };

  return (
    <>
      <button onClick={() => {onClickDelete()}} id="btnDelete">Delete</button> 
    </>
  );
}

export default Button;

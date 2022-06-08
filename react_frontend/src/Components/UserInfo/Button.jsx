import React from "react";
import EndPoints from "../../constants/endPoints";


var deleteUserEndPoint = EndPoints.deleteUserEndPoint

function Button() {

  const onClickDelete = () => {
    console.log("Delete");

    fetch(deleteUserEndPoint, {
      credentials: 'include'
    })
      .then(async (response) => {
        let message = await response.json()
        if (!response.ok) throw new Error(message.message);
        else return message.message;
      })
      .then(async (result) => {
        console.log(result)
      })
      .catch(error => {
        localStorage.setItem("isLoggedIn", false)
        window.location.href = "/login"
      })
  };

  return (
    <>
      <button onClick={() => { onClickDelete() }} id="btnDelete">Delete</button>
    </>
  );
}

export default Button;

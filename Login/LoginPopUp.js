let Login = Boolean;



function myFunction() {
    if (Login == false){
        window.location.href = '/login/LoginPagina.html';
        let Popup = "Login";
        console.log(Popup);
        alert(Popup);

    }
    else{
        alert("ok");
        //window.location.href = '/login/LoginPagina.html';
    }
    
  }
  function LoginG() {
    if (Login == false){
        
        alert("ok");
    }
    else{
        window.location.href = '/login/LoginPagina.html';
        let Popup = "Login";
        console.log(Popup);
        alert(Popup);
    }
    
  }
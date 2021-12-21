 var  tuname='admin'  ,tpsw='admin';
    
 
 validate=()=>{
   
    const usern=document.myForm.uname.value, pass=document.myForm.psw.value
    
    if(usern.trim().length==0) {
        document.querySelector('.noti').innerText="Không được để trống"; 
        // document.myForm.uname.focus();
        return false
     }
    else  {

        document.querySelector('.noti').innerText=""; 
    }
    if(pass.trim().length==0) {
        document.querySelector('.noti').innerText="Không được để trống"; 
        // document.myForm.psw.focus();
        return false
     }
    else  {document.querySelector('.noti').innerText="";}
    if(usern!=tuname&&usern!=null&&pass!=null||pass!=tpsw) {
        document.querySelector('.noti').innerText="Tài khoản hoặc mật khẩu không đúng";     
        document.myForm.uname.focus();
        return false
     }
    else  {document.querySelector('.noti').innerText="";}
    if(true){
        document.querySelector('.btn-show').innerText="Đăng nhập thành công"; 
        // document.getElementById('id01').style.display='none'
        // document.getElementById('btn-login').className+="close"
        $('#dialogdangnhap').modal('hide')
        // console.log(pass)
    }     
 }

load=()=>{
    document.querySelector('.post').innerText="Loading..."; 
    setTimeout(()=>{
          validate();
        document.querySelector('.post').innerText="Login"; 
    },1000)
}

changePassShow=()=>{
    $('#dialogdangnhap').modal('hide')
    $('#changePass').modal('show')
}
back=()=>{
    $('#dialogdangnhap').modal('show')
    $('#changePass').modal('hide')
}

changePass=()=>{
    let oldPass= document.getElementById('oldpsw').value
    let newPass=  document.getElementById('newpsw').value
    if(oldPass==tpsw&&newPass!=null){
        tpsw=newPass
    //   console.log(tpsw)
    back()
    }
}


var r = document.querySelector(':root');
let height = $(window).height()+"px";
let height2 = $(window).height()+100+"px";
r.style.setProperty('--height', height);
r.style.setProperty('--height2', height2);
// alert("all");

 function ModuleSwitch(){
    let a = document.getElementById("sign-in").classList;
    if(a.contains("d-none")){
        a.remove("d-none")
        document.getElementById("signup").classList.add("d-none")
        r.style.setProperty('--atJustPadding', '0px');
    }
    else{
        a.add("d-none")
        document.getElementById("signup").classList.remove("d-none")
        r.style.setProperty('--atJustPadding', '100px');

    }
 }

 function login(){
        document.getElementById("sign-in").classList.remove("d-none");
        document.getElementById("signup").classList.add("d-none");
        document.getElementById("modules").classList.add("d-none");
        r.style.setProperty('--atJustPadding', '0px');

 }

 function SignUp(){
    document.getElementById("signup").classList.remove("d-none");
    document.getElementById("sign-in").classList.add("d-none");
    document.getElementById("modules").classList.add("d-none");
    r.style.setProperty('--atJustPadding', '100px');

}

function LoginData(){
    let remember_me = document.getElementById("remember-me").checked;
    let your_pass = document.getElementById("your_pass").value;
    let your_email = document.getElementById("your_email").value;

    // alert(remember_me+""+your_pass+""+your_email);

    let data = {
        email:your_email,
        password:your_pass,
        remember:remember_me,
    }

    $.ajax({
        
        url: "../../PHP/login.php",
        method:"POST",
        data: data,
        success: function (res) {
            console.log(res);
            let values = JSON.parse(res);
            if(values== 3){
                // alert(values); Password is Invalid
                document.getElementById("your_pass").classList.add("error");
                document.getElementById("your_pass_icon").classList.add("error");
                document.getElementById("your_email").classList.remove("error");
                document.getElementById("your_email_icon").classList.remove("error");
            }
           else if(values== 2){
                // alert(values); Email not found
                document.getElementById("your_email").classList.add("error");
                document.getElementById("your_email_icon").classList.add("error");
                document.getElementById("your_pass").classList.remove("error");
                document.getElementById("your_pass_icon").classList.remove("error");
            }
            else if(values== 1){
                // alert(values); Success Fully logged in 
                document.getElementById("your_email").classList.remove("error");
                document.getElementById("your_email_icon").classList.remove("error");
                document.getElementById("your_pass").classList.remove("error");
                document.getElementById("your_pass_icon").classList.remove("error");

                sessionStorage.setItem("email", your_email);
                location.replace("../Landing_Page/index.html");


            }
        }


        
    });





}


function Register(){
    let User_name = document.getElementById("name");
    let email = document.getElementById("email");
    let pass = document.getElementById("pass");
    let re_pass = document.getElementById("re_pass");
    let agreeTerm = document.getElementById("agree-term").checked;

    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

    if(email.value.match(validEmail)){
        email.classList.remove("error");
        document.getElementById("email_error").innerHTML="";
    }
    else{
        email.classList.add("error");
        document.getElementById("email_error").innerHTML="Email is Not Valid";
        return false;
    }


    if(pass.value != re_pass.value){
        re_pass.classList.add("error");
        document.getElementById("re_pass_error").innerHTML="Confirm Password was does not Match";
        return false;
    }else{
        re_pass.classList.remove("error");
        document.getElementById("re_pass_error").innerHTML="";
    }

    if(agreeTerm==false){
        // alert(agreeTerm);
        document.getElementById("agree-term_error").classList.add("error");
        document.getElementById("agree-term_error").innerHTML="You Must Agree ON Our Terms";
        return false;
    }
    else{
        // alert(agreeTerm);
        document.getElementById("agree-term_error").classList.remove("error");
        document.getElementById("agree-term_error").innerHTML="";
    }


    let RegisterData = {
        Name:User_name.value,
        Email:email.value,
        password:pass.value,
        agreeTerm:agreeTerm,
    }

    console.log(RegisterData);

        $.ajax({
        
            url: "../../PHP/Register.php",
            method:"POST",
            data: RegisterData,
            success: function (res) {

                if( res =='2 Email Already Exist')
                {
                    // alert(res);
                email.classList.add("error");
                document.getElementById("email_error").innerHTML="Email Already Exist";
                }
                else{
                    alert(res);
                    sessionStorage.setItem("email", email.value);
                    location.replace("../Landing_Page/index.html");
                }
            }
        });
}
const nameInput=document.getElementById("name");

const emailInput=document.getElementById("email");

const phoneInput=document.getElementById("phone");

const passwordInput=document.getElementById("password");

const togglePassword=document.getElementById("togglePassword");

// Character Counter

nameInput.addEventListener("input",()=>{

document.getElementById("nameCounter").innerHTML=

`${nameInput.value.length} / 50 Characters`;

});

// Email Validation

emailInput.addEventListener("input",()=>{

const email=emailInput.value;

const message=document.getElementById("emailMessage");

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(regex.test(email)){

message.innerHTML="✅ Valid Email";

message.style.color="green";

}

else{

message.innerHTML="❌ Invalid Email";

message.style.color="red";

}

});

// Phone Validation

phoneInput.addEventListener("input",()=>{

const phone=phoneInput.value;

const msg=document.getElementById("phoneMessage");

if(phone.length===10){

msg.innerHTML="✅ Valid Phone";

msg.style.color="green";

}

else{

msg.innerHTML="❌ Phone should contain 10 digits";

msg.style.color="red";

}

});

// Password Strength

passwordInput.addEventListener("input",()=>{

const value=passwordInput.value;

const text=document.getElementById("strengthText");

let strength=0;

if(value.length>=8) strength++;

if(/[A-Z]/.test(value)) strength++;

if(/[0-9]/.test(value)) strength++;

if(/[!@#$%^&*]/.test(value)) strength++;

if(strength<=1){

text.innerHTML="🔴 Weak Password";

text.style.color="red";

}

else if(strength===2||strength===3){

text.innerHTML="🟡 Medium Password";

text.style.color="orange";

}

else{

text.innerHTML="🟢 Strong Password";

text.style.color="green";

}

});

// Show Password

togglePassword.addEventListener("click",()=>{

if(passwordInput.type==="password"){

passwordInput.type="text";

togglePassword.innerHTML="🙈";

}

else{

passwordInput.type="password";

togglePassword.innerHTML="👁";

}

});

// ===============================
// DARK MODE
// ===============================

const themeBtn=document.getElementById("themeToggle");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeBtn.innerHTML="☀";

}

else{

themeBtn.innerHTML="🌙";

}

});

// ===============================
// LIVE PREVIEW
// ===============================

nameInput.addEventListener("input",()=>{

document.getElementById("previewName").innerHTML=nameInput.value;

updateProgress();

});

emailInput.addEventListener("input",()=>{

document.getElementById("previewEmail").innerHTML=emailInput.value;

updateProgress();

});

phoneInput.addEventListener("input",()=>{

document.getElementById("previewPhone").innerHTML=phoneInput.value;

updateProgress();

});

document.querySelector("select").addEventListener("change",(e)=>{

document.getElementById("previewCourse").innerHTML=e.target.value;

updateProgress();

});

// ===============================
// PROGRESS BAR
// ===============================

function updateProgress(){

let completed=0;

if(nameInput.value!="") completed++;

if(emailInput.value!="") completed++;

if(phoneInput.value!="") completed++;

if(document.querySelector("select").value!="") completed++;

if(passwordInput.value!="") completed++;

const percent=completed*20;

const bar=document.getElementById("progressBar");

bar.style.width=percent+"%";

bar.innerHTML=percent+"%";

}

// Password also updates progress

passwordInput.addEventListener("input",updateProgress);

// ===============================
// TOAST
// ===============================

document.querySelector("form").addEventListener("submit",(e)=>{

const toast=new bootstrap.Toast(

document.getElementById("successToast")

);

toast.show();

});
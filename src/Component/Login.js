import { useEffect, useState } from "react";
import Home from "./Home";
import Loader from './Loader'
import emailjs from 'emailjs-com'
import axios from "axios";
import classes from './Login.module.css'

const countI = 1;
const apiKey ='qBl895pm2jTcUWNVtqyaw9eweXbMHbV11QguRxoGNBo';
let apiurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countI}`;

function Login(){
  const [photo,setPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const [showResults, setShowResults] = useState(false)
  const [userLog, setUserLog] = useState(false)
  const [loading, setLoading] = useState(false);

  let sendOtp=123456;
  let userTrue = 0    

  useEffect(() => {
    if(userLog){
      setTimeout(async () => {
        const response = await axios.get(
            `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
        );

        setPhotos((prev) => {
            return [...prev, ...response.data];
        });
        setLoading(false);
    }, 1500);
    }
   
}, [count,userLog,userTrue]);

useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
}, []);

const handleScroll = async () => {
    if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
        setLoading(true);
        setCount((prev) => prev + 1);
    }
};

const send =(event)=>{
  event.preventDefault();
  sendOtp = Math.floor(100000 + Math.random() * 900000);
  const userData ={
    Name:event.target[0].value,
    Email:event.target[1].value,
    OTP:sendOtp
  }
  userTrue = 1;

  emailjs.send('service_8abrzpf','template_fkh7d0f',userData,'gIN-TLSNBbvc_46xC').then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  });
}

const otpVerification = (inputOtp)=>{
  inputOtp.preventDefault();
  const verificationOtp = +inputOtp.target[0].value;

  if(sendOtp === verificationOtp && userTrue === 1){
    setUserLog(true)
    getPhoto()
  }else{
    alert('Error Please enter a valid OTP.')
  }
}

// const otpVerification = (inputOtp)=>{
//   inputOtp.preventDefault();
//   const verificationOtp = +inputOtp.target[0].value;

//   if(sendOtp === verificationOtp){
//       setUserLog(true)
//       getPhoto()
//   }else{
//     alert('Error Please enter a valid OTP.')
//   }
// }
async function getPhoto(){ 
  try{
    const response = await fetch(apiurl);
    const photoArray = await response.json();
    if(photoArray){
      setShowResults(true)
    }
    setPhotos(photoArray)
  }catch(error){
  }
}

  return(
    <>

{showResults ? 
<div>
<h1>Inst Photos</h1>
<Home photos={photo}></Home> 
</div>
: '' }
  
  {showResults ? '' :
  <div className={classes.formContainer}>
      <div>
        <h1>Sign Up</h1>
        <p>It's free and only takes a minute</p>
        <form onSubmit={send}>
          <div>
          <label>Name</label><br/>
          <input type='text' name='name'></input>
          </div>
          <div>
          <label>Enter Email</label><br/>
          <input type='email' name='Email'></input><br/>
          </div> <br/>
          <button type="submit" value="Submit">Send</button><br/>
    </form>

    <form onSubmit={otpVerification} id='otp'>
        <div>
          <br/>
            <label>OTP</label><br/>
            <input type="OTP" name="OPT" id="OTP" />
          </div><br/>
          <button type="submit" value="Submit">Sign Up</button>
     </form>
    </div>
      <p>By clicking the Sign Up button, you agree to our</p>
      <p>Terms & Conditions and Privacy Policy</p>
  </div>}

  {loading && <Loader />}
    
    </>
  );

}
export default Login;
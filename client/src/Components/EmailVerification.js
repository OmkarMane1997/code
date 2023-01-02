import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import success from '../assets/image/checked.png';
import error from '../assets/image/cancel.png';
function EmailVerification() {
    const [status, setStatus] = useState('')
    const [image, setImage] = useState('')

    const params = useParams(); // to read router params

    const getVerification=async ()=>{
     try {
        const result = await axios.post(`http://localhost:4000/api/v1/registration/email-verification/${params.id}/${params.token}`);
        console.log('result:-',result.data.msg);
        setStatus(result.data.msg);
        setImage(success);
     } catch (err) {
      setStatus(err.response.data.msg);
      setImage(error);
     }
    }

    useEffect(() => {
        getVerification()
    }, [])
    
  return (
    <div className="container shadow my-5">
      <div className="row my-5">
        <div className="offset-md-4 col-md-4 my-5 text-center">
          <img src={image} alt={image} className='img-fluid w-50 h-50 my-5'/>
            <h1 >{status}</h1>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;

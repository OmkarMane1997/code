import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function EmailVerification() {
    const [status, setStatus] = useState('')

    const params = useParams(); // to read router params

    const getVerification=async ()=>{
     try {
        const result = await axios.post(`http://localhost:4000/api/v1/registration/email-verification/${params.id}/${params.token}`);
        console.log('result:-',result.data.msg);
        setStatus(result.data.msg);

     } catch (err) {
      setStatus(err.response.data.msg);
       
     }
    }

    useEffect(() => {
        getVerification()
    }, [])
    
  return (
    <div className="container shadow my-5">
      <div className="row my-5">
        <div className="offset-md-4 col-md-5 my-5">
            <h1>{status}</h1>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;

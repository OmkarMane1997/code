# code s
# ENV file
PORT=4000
HOST=""
USER=""
PASSWORD=""
DATABASE=""
DBPORT="3306"
TOKEN_SECRET=



# API List:-
Reg:- http://localhost:4000/api/v1/registration/register  <br>
method:- Post<br>
data:- {
  "name":"Raju Powar ",
  "email":"RajuPowar@gmail.com",
  "password":"Admin@1234"
}<br>
++++++++++++++++++++<br>
Normal login<br>
Login:- http://localhost:4000/api/v1/login/login<br>
Method:- Post.<br>
Data:-{
  "email":"RajuPowar@gmail.com",
  "password":"Admin@1234"
}<br>
+++++++++++++++++++++<br>
Logout:- http://localhost:4000/api/v1/login/logout<br>
Method:- Get<br>
Data: NA.<br>
+++++++++++++++++++++<br>
refreshToken:-http://localhost:4000/api/v1/login/refreshToken<br>
Method:- Get<br>
Data: NA.<br>
+++++++++++++++++++++<br>
resetPassword:-http://localhost:4000/api/v1/login/resetPassword<br>
Method:- Post<br>
Data: NA.<br>
header required:- refreshToken it generate the token need to pass the in header
++++++++++++++++++++++++++<br>
Profile:-http://localhost:4000/api/v1/login/profile<br>
method:-Get<br>
Data: NA.<br>
header required:- refreshToken it generate the token need to pass the in header
++++++++++++++++++++++++++<br>
Forgot password:-http://localhost:4000/api/v1/login/forgot-password
method:- POST
Data:{
  "email":"omkarmane010197@gmail.com"
}
++++++++++++++++++++++++++<br>
login with Code-s api :- http://localhost:4000/api/v1/login/code-s
method:- POST
{
  "email":"omkarmane0@gmail.com",
  "password":"Admin@1234"
}
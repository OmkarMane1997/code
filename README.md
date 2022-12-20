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
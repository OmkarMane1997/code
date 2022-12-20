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
Reg:- http://localhost:4000/api/v1/registration/register 
method:- Post
data:- {
  "name":"Raju Powar ",
  "email":"RajuPowar@gmail.com",
  "password":"Admin@1234"
}
++++++++++++++++++++
Normal login
Login:- http://localhost:4000/api/v1/login/login
Method:- Post.
Data:-{
  "email":"RajuPowar@gmail.com",
  "password":"Admin@1234"
}
+++++++++++++++++++++
Logout:- http://localhost:4000/api/v1/login/logout
Method:- Get
Data: NA.
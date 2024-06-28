To run locally

1. cd to express-auth folder
   Then run :- node ./server.js

2. To debug it. Open VS code
   Goto Run and Debug Section.
   Launch "Launch Express Server"

3. API's

a. To register user:
Post: http://localhost:3000/api/auth/register
Body (json) : { "password" : "P@12345#", "name" : "Sagar", "email" : "sagar@gmail.com", "role" : "User" }

We have 3 roles i.e ["SuperAdmin", "Admin", "User"]

b. To Login
Post: http://localhost:3000/api/auth/login
Body (json): { "password" : "P@12345#", "email" : "sagar@gmail.com" }

c. To get user data
Get: http://localhost:3000/api/users/{Id}
And Set Bearer token
Or use below

curl --location 'http://localhost:3000/api/users/EV9uzrMa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhZ2FyQGdtYWlsLmNvbSIsImlkIjoiN2R5WmJTbmIiLCJpYXQiOjE3MTMzNTA4OTcsImV4cCI6MTcxMzM1NDQ5N30.Vgwmxe5KB4eU-Ek9wBbOXTLtcO6J9dymndQHxgf7KPI'

Few more Apis

1. Get: http://localhost:3000/api/superadmin

- Only superadmin can access this API.
  To access this, login with superadmin user

2. Get: http://localhost:3000/api/admin

- Only superadmin and admin can access this API.
  To access this, login with superadmin or admin user

2. Get: http://localhost:3000/api/user

- Superadmin, admin and user all can access this API.

## Documentation of JWT authentication
### Receive new Access and Refresh tokens using valid credentials  
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/auth/token</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "username" : [alphanumeric], "password" : [alphanumeric] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "token" : [string], "refreshToken" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong> <code>{ "message": "Credentials are invalid. Please enter valid username and password" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{"username" : "User", "password" : "password"}'    http://localhost:8080/rest/auth/token</code></td>
    </tr>
  </tbody>
</table>                                   
### Receive refreshed Access token using valid Refresh token
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/auth/token</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "expiredToken" : [string], "refreshToken" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "refreshedToken" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong> <code>{ "message": "Refresh or expired access token is invalid. Please enter valid tokens" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{"expiredToken":"eyJhbG                                        ciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImNyZWF0ZWQiOjE0ODE2MzkxOTMxNjUsImV4cCI6M                                                        TQ4MTY0Mjc5M30.snx5TnaJ3baoKOwhDCBl8YKYCRCIvasDbSqsI8qHyrDkFjNu7lzIwlH9gUavx                                                      NfP3xmelZM6OC2HxomHaUvQ", "refreshToken":"eyJhbGciOiJIUzUxMiJ9.eyzdWIiOiJBZG                                                    1pbiIsImNyZWF0ZWQiOjE0ODE2MzkxOTM0MjIsImV4cCI6MTQ4MTcyNTU5M30.2y6jkpg9hqFaHo                                                    DJ7eU4LCbRWjXENRPfGZtV0N3SKU1RBwSH5bujq2Fnq9jFOxvVbJETeGs7VGL9QqjpAnXkZ"}'     http://localhost:8080/rest/auth/token</code></td>
    </tr>
  </tbody>
</table>
### Notes
#### Default application properties, used for JWT authentication (can be changed through System properties):
1. jwt.header=X-Authorization
2. jwt.secret=smsc.io
3. jwt.expiration=3600 (Access token lives 1 hour, Refresh token - 1 day)

## Documentation of REST API CRUD methods
### User CRUD methods
#### Create user
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/users</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "username" : [alphanumeric], "password" : [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email]}</code> <br /> <strong>Optional:</strong> <code>"active" : [boolean], "blocked" : [boolean]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "id": [long], "username" : [alphanumeric], "password" : [alphanumeric], "salt" : [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email], "active" : [boolean], created : [timestamp], "blocked" : [boolean] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": ""User with this username or email already exists" }</code> <br /> OR <br />  <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User username cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User password cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User firstname cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User surname cannot be empty"}] " }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User email cannot be empty"}] " }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User email has invalid format"}] " }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "username" : "Old Johnny", "password" : "john123456", "firstname" : "John", "surname" : "Forrester", "email" : "john@gmail.com", "active" : true, "blocked" : false }' http://localhost:8080/rest/repository/users</code></td>
    </tr>
  </tbody>
</table>
#### Update user
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/users/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "username" : [alphanumeric], "password" : [alphanumeric], "salt" : [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email], "active" : [boolean], "blocked" : [boolean]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "id": [long], "username" : [alphanumeric], "salt" : [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email], "active" : [boolean], created : [timestamp], "blocked" : [boolean] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  404 NOT FOUND <br /> <strong>Content:</strong>  <code>{ "message": "User with id = [long] was not found" }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": ""User with this username already exists" }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": ""User with this email already exists" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User username cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User password cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "errors" : [{"defaultMessage": "User firstname cannot be empty"}] }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User surname cannot be empty"}] " }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User email cannot be empty"}] " }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : " "errors" : [{"defaultMessage": "User email has invalid format"}] " }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "username" : "Old Johnny", "password" : "john123456", "firstname" : "John", "surname" : "Forrester", "email" : "john@gmail.com", "active" : true, "blocked" : false }' http://localhost:8080/rest/repository/users/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one user
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/users/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "id": [long], "username" : [alphanumeric], "salt": [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email], "active" : [boolean], "created": [timestamp], "blocked" : [boolean] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> <strong>Content:</strong>  <code>{ "message": "User with id = [long] was not found" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl http://localhost:8080/rest/repository/users/1</code></td>
    </tr>
  </tbody>
</table>
#### Find all users
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/users</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>[{ "id": [long], "username" : [alphanumeric], "salt": [alphanumeric], "firstname" : [string], "surname" : [string], "email" : [email], "active" : [boolean], "created": [timestamp], "blocked" : [boolean] },...]</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl http://localhost:8080/rest/repository/users</code></td>
    </tr>
  </tbody>
</table>
#### Delete user
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/users/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> <strong>Content:</strong>  <code>{ "message": "User with id = [long] was not found" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X DELETE http://localhost:8080/rest/repository/users/1</code></td>
    </tr>
  </tbody>
</table>
### Role CRUD methods
#### Create role
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Role name can be only uppercase and contain _ symbol" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Role name cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{"name" : "NEW_ROLE" }' http://localhost:8080/rest/repository/roles</code></td>
    </tr>
  </tbody>
</table>
#### Update role
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Role name can be only uppercase and contain _ symbol" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Role name cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{"name" : "NEW_ROLE" }' http://localhost:8080/rest/repository/roles/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one role
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl http://localhost:8080/rest/repository/roles/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one role by name
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles/search/findByName</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>name=[string]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl http://localhost:8080/rest/repository/roles/search/findByName?name=someName</code></td>
    </tr>
  </tbody>
</table>
#### Find all roles
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"roles": [ { "name": [string] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl http://localhost:8080/rest/repository/roles/search/findAll</code></td>
    </tr>
  </tbody>
</table>
#### Delete role
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/roles/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X DELETE http://localhost:8080/rest/repository/roles/1</code></td>
    </tr>
  </tbody>
</table>
### Customer CRUD methods
#### Create customer
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string] }</code> <br /> <strong>Optional:</strong> <code>"vatid" : [double], "parentCustomer" : [URI]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string], "vatid" : [double] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (customer_id)=[double] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "customerId" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "companyName" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "street" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "street2" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "postcode" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "country" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "city" parameter cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "customerId" : 2.0, "companyName" : "newCompany", "street" : "newStreet", "street2" : "newStreet2", "postcode" : "79005", "country" : "Ukraine", "city" : "Lviv", "vatid" : 999.0 }' http://localhost:8080/rest/repository/customers</code></td>
    </tr>
  </tbody>
</table>
#### Update customer
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string]}</code> <br /> <strong>Optional:</strong> <code>"vatid" : [double], "parentCustomer" : [URI]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string], "vatid" : [double] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (customer_id)=[double] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "customerId" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "companyName" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "street" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "street2" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "postcode" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "country" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer "city" parameter cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "customerId" : 2.0, "companyName" : "newCompany", "street" : "newStreet", "street2" : "newStreet2", "postcode" : "79005", "country" : "Ukraine", "city" : "Lviv", "vatid" : 999.0 }' http://localhost:8080/rest/repository/customers/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one customer
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string], "vatid" : [double] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customers/1</td>
    </tr>
  </tbody>
</table>
#### Find one customer by customerId
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers/search/findByCustomerId</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>customerId=[double]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string], "vatid" : [double] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customers/search/findByCustomerId?customerId=10.0</td>
    </tr>
  </tbody>
</table>
#### Find all customers
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"customers": [ { "customerId" : [double], "companyName" : [string], "street" : [string], "street2" : [string], "postcode" : [string], "country" : [string], "city" : [string], "vatid" : [double] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customers/search/findAll</td>
    </tr>
  </tbody>
</table>
#### Delete customer
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customers/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> <strong>Content:</strong>  <code>{ "message": "Customer with id = [long] was not found" } <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl -X DELETE http://localhost:8080/rest/repository/customers/1</td>
    </tr>
  </tbody>
</table>
### CustomerContact CRUD methods
#### Create customerContact
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [email], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code> <br /> <strong>Optional:</strong> <code>"customer" : [URI]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [email], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (email_address)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "firstname" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "surname" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "phone" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "mobilePhone" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "fax" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "emailAddress" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "emailAddress" has invalid format" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "type" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "salutation" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.customer.Salutation from String [string]: value not one of declared Enum instance names: [MR,MRS]" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.customer.Type from String [string]: value not one of declared Enum instance names: [PRIMARY, CEO, TECHNICAL]" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "firstname" : "newName", "surname" : "newSurname", "phone" : "0322222222", "mobilePhone" : "0632222222", "fax" : "new_fake_fax", "emailAddress" : "fake@gmail.com", "type" : "CEO", "salutation" : "MR" }' http://localhost:8080/rest/repository/customer-contacts</code></td>
    </tr>
  </tbody>
</table>
#### Update customerContact
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [string], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code> <br /> <strong>Optional:</strong> <code>"customer" : [URI]</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [string], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (email_address)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "firstname" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "surname" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "phone" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "mobilePhone" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "fax" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "emailAddress" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "emailAddress" has invalid format" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "type" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Customer contact "salutation" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.customer.Salutation from String [string]: value not one of declared Enum instance names: [MR,MRS]" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.customer.Type from String [string]: value not one of declared Enum instance names: [PRIMARY, CEO, TECHNICAL]" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "firstname" : "newName", "surname" : "newSurname", "phone" : "0322222222", "mobilePhone" : "0632222222", "fax" : "new_fake_fax", "emailAddress" : "fake@gmail.com", "type" : "CEO", "salutation" : "MR" }' http://localhost:8080/rest/repository/customer-contacts/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one customerContact
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [string], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customer-contacts/1</td>
    </tr>
  </tbody>
</table>
#### Find one customerContact by email address
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts/search/findByEmailAddress</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>emailAddress=[string]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [string], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customer-contacts/search/findByEmailAddress?emailAddress=email@gmail.com</td>
    </tr>
  </tbody>
</table>
#### Find all customerContacts
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"customer-contacts": [ { "firstname" : [string], "surname" : [string], "phone" : [string], "mobilePhone" : [string], "fax" : [string], "emailAddress" : [string], "type" : [CEO,TECHNICAL,PRIMARY], "salutation" : [MR,MRS] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/customer-contacts/search/findAll</td>
    </tr>
  </tbody>
</table>
#### Delete customerContact
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/customer-contacts/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl -X DELETE http://localhost:8080/rest/repository/customer-contacts/1</td>
    </tr>
  </tbody>
</table>
### Dashboard CRUD methods
#### Create dashboard
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboards</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "user_account" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard "icon" parameter cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "name" : "default_admin", "icon" : "admin", "user" : "/rest/repository/users/1" }' http://localhost:8080/rest/repository/dashboards</code></td>
    </tr>
  </tbody>
</table>
#### Update dashboard
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboards/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "user_account" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard "icon" parameter cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "name" : "default_admin", "icon" : "admin", "user" : "/rest/repository/users/1" }' http://localhost:8080/rest/repository/dashboards/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one dashboard
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>/rest/repository/dashboards/:id</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboards/1</td>
    </tr>
  </tbody>
</table>
#### Find one dashboard by name
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>/rest/repository/dashboards/search/findByName</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>name=[string]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "icon" : [string], "user" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboards/search/findByName?name=someName</td>
    </tr>
  </tbody>
</table>
#### Find all dashboards
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboards/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"dashboards": [ { "name" : [string], "icon" : [string], "user" : [URI] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboards/search/findAll</td>
    </tr>
  </tbody>
</table>
#### Delete dashboard
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboards/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl -X DELETE http://localhost:8080/rest/repository/dashboards/1</td>
    </tr>
  </tbody>
</table>
### DashboardBox CRUD methods
#### Create dashboardBox
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-boxes</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100], "dashboard" : [URI], "dashboardBoxType" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100]" }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "dashboard" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "dashboard_box_type" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "order" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "description" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "width" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "height" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Width from String [string]: value not one of declared Enum instance names: [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100]" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Height from String [string]: value not one of declared Enum instance names: [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100]" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "name" : "new dashboardBox", "description" : "new dashboardBox desc", "order" : 50, "width" : "WIDTH_25", "height" : "HEIGHT_25", "dashboard" : "/rest/repository/dashboards/1", "dashboardBoxType" : "/rest/repository/dashboard-box-types/2" }' http://localhost:8080/rest/repository/dashboard-boxes</code></td>
    </tr>
  </tbody>
</table>
#### Update dashboardBox
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-boxes/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100], "dashboard" : [URI], "dashboardBoxType" : [URI] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "dashboard" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message" : "ERROR: null value in column "dashboard_box_type" violates not-null constraint" }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "order" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "description" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "width" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box "height" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Width from String [string]: value not one of declared Enum instance names: [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100]" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Height from String [string]: value not one of declared Enum instance names: [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100]" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "name" : "new dashboardBox", "description" : "new dashboardBox desc", "order" : 50, "width" : "WIDTH_25", "height" : "HEIGHT_25", "dashboard" : "/rest/repository/dashboards/1", "dashboardBoxType" : "/rest/repository/dashboard-box-types/2" }' http://localhost:8080/rest/repository/dashboard-boxes/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one dashboardBox
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-boxes/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboard-boxes/1</td>
    </tr>
  </tbody>
</table>
#### Find all dashboardBoxes
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-boxes/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"dashboard-boxes": [ { "name" : [string], "description" : [string], "order" : [integer], "width" : [WIDTH_25,WIDTH_50,WIDTH_75,WIDTH_100], "height" : [HEIGHT_25,HEIGHT_50,HEIGHT_75,HEIGHT_100] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboard-boxes/search/findAll</td>
    </tr>
  </tbody>
</table>
#### Delete dashboardBox
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-boxes/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl -X DELETE http://localhost:8080/rest/repository/dashboard-boxes/1</td>
    </tr>
  </tbody>
</table>
### DashboardBoxType CRUD methods
#### Create dashboardBoxType
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>POST</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  201 CREATED <br /> <strong>Content:</strong>  <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "type" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "kind" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Kind from String [string]: value not one of declared Enum instance names: [PIE_CHART, SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS]" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Can not deserialize value of type io.smsc.model.dashboard.Type from String [string]: value not one of declared Enum instance names: [STATUS,CHART]" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X POST -H "Content-Type: application/json" -d '{ "name" : "new dashboard box type", "type" : "CHART", "kind" : "BAR_CHART" }' http://localhost:8080/rest/repository/dashboard-box-types</code></td>
    </tr>
  </tbody>
</table>
#### Update dashboardBoxType
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>PUT</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td><strong>Required:</strong> <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  409 CONFLICT <br /> <strong>Content:</strong>  <code>{ "message": "ERROR: duplicate key value violates unique constraint. Detail: Key (name)=[string] already exists." }</code> <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "name" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "type" parameter cannot be empty" }</code> <br /> OR <br /> <strong>Code:</strong>  400 BAD REQUEST <br /> <strong>Content:</strong>  <code>{ "message" : "Dashboard box type "kind" parameter cannot be empty" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td><code>curl -X PUT -H "Content-Type: application/json" -d '{ "name" : "new dashboard box type", "type" : "CHART", "kind" : "BAR_CHART" }' http://localhost:8080/rest/repository/dashboard-box-types/1</code></td>
    </tr>
  </tbody>
</table>
#### Find one dashboardBoxType
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td>strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboard-box-types/1</td>
    </tr>
  </tbody>
</table>
#### Find one dashboardBoxType by name
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types/search/findByName</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>name=[string]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td>strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboard-box-types/search/findByName?name=someName</td>
    </tr>
  </tbody>
</table>
#### Find all dashboardBoxTypes
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types/search/findAll</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  200 OK <br /> <strong>Content:</strong>  <code>{ "_embedded": {"dashboard-box-types": [ { "name" : [string], "type" : [STATUS,CHART], "kind" : [PIE_CHART,SERIAL_CHART,LINE_CHART,BAR_CHART,BUBBLE_CHART,FEEDBACK_STATUS,
PROFIT_STATUS,ORDERS_STATUS,USERS_STATUS] }, ... ] }</code></td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl http://localhost:8080/rest/repository/dashboard-box-types/search/findAll</td>
    </tr>
  </tbody>
</table>
#### Delete dashboardBoxType
<table>
  <tbody>
    <tr>
      <td><strong>URL</strong></td>
      <td><code>/rest/repository/dashboard-box-types/:id</code></td>
    </tr>
    <tr>
      <td><strong>Method</strong></td>
      <td><code>DELETE</code></td>
    </tr>
    <tr>
      <td><strong>URL Params</strong></td>
      <td><strong>Required:</strong><code><code>id=[integer]</code></td>
    </tr>
    <tr>
      <td><strong>Data Params</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Success Response</strong></td>
      <td><strong>Code:</strong>  204 NO CONTENT</td>
    </tr>
    <tr>
      <td><strong>Error Response</strong></td>
      <td><strong>Code:</strong> 404 NOT FOUND <br /> OR <br /> <strong>Code:</strong>  401 UNAUTHORIZED <br /> <strong>Content:</strong>  <code>{ "message": "Unauthorized or token is expired. Please login with valid credentials" }</code></td>
    </tr>
    <tr>
      <td><strong>Sample Call</strong></td>
      <td>curl -X DELETE http://localhost:8080/rest/repository/dashboard-box-types/1</td>
    </tr>
  </tbody>
</table>

### Notes
#### Each request should contain header with valid and not expired Access token. Header name is "X-Authorization" by default and can be changed using System properties (property name - jwt.header).

# Postman Collection for JWT Authentication Testing

This document provides the API endpoints and sample requests for testing the JWT authentication system.

## Base URL
```
http://localhost:8080
```

## API Endpoints

### 1. User Login
**POST** `/api/login`

Authenticate with username and password to receive a JWT token.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "username": "admin",
    "password": "password"
}
```

**Success Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTI5NjQwMCwiZXhwIjoxNjk5MzgyODAwfQ.signature",
    "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
    "error": "Invalid credentials"
}
```

### 2. User Registration
**POST** `/api/register`

Register a new user in the system.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "username": "newuser",
    "password": "newpassword",
    "role": "USER"
}
```

**Success Response (200 OK):**
```json
{
    "message": "User registered successfully",
    "username": "newuser"
}
```

**Error Response (400 Bad Request):**
```json
{
    "error": "Username already exists"
}
```

### 3. Protected Hello Endpoint
**GET** `/api/hello`

Access a protected endpoint that requires authentication.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200 OK):**
```json
{
    "message": "Hello! You have successfully accessed a protected endpoint!",
    "username": "admin",
    "status": "authenticated"
}
```

**Error Response (401 Unauthorized):**
- If no token is provided or token is invalid/expired

### 4. Public Info Endpoint
**GET** `/api/public/info`

Access a public endpoint that doesn't require authentication.

**Success Response (200 OK):**
```json
{
    "message": "This is a public endpoint - no authentication required",
    "status": "public"
}
```

## Testing Steps

### Step 1: Login and Get Token
1. Send a POST request to `/api/login` with valid credentials
2. Copy the token from the response

### Step 2: Access Protected Endpoint
1. Send a GET request to `/api/hello`
2. Include the token in the Authorization header: `Authorization: Bearer <token>`
3. You should receive a success response with your username

### Step 3: Test Without Token
1. Send a GET request to `/api/hello` without the Authorization header
2. You should receive a 401 Unauthorized error

### Step 4: Test Public Endpoint
1. Send a GET request to `/api/public/info`
2. No authentication required - should work without any headers

## Sample Users

The database comes with two pre-configured users:
- **Username:** admin, **Password:** password, **Role:** ADMIN
- **Username:** user, **Password:** password, **Role:** USER

## Notes
- JWT tokens expire after 24 hours (86400000 milliseconds)
- All passwords are stored using BCrypt encryption
- The application runs on port 8080 by default

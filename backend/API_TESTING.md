# API Testing Guide - Neuroprompt Backend

Base URL: `http://localhost:5000`

## Authentication Endpoints

### 1. Health Check

**GET** `/`

```bash
curl http://localhost:5000
```

**Expected Response:**
```json
{
  "message": "Neuroprompt API is running",
  "version": "1.0.0",
  "status": "active"
}
```

---

### 2. Sign Up (Register New User)

**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**PowerShell Command:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123"}'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "test@example.com",
    "createdAt": "2026-02-05T16:47:33.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing email/password or password too short
- `409` - User already exists

---

### 3. Login

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**PowerShell Command:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123"}'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "test@example.com",
    "usageStats": {
      "dailyCount": 0,
      "lastResetDate": "2026-02-05T16:47:33.000Z",
      "totalEnhancements": 0,
      "dailyLimit": 50
    },
    "preferences": {
      "saveHistory": true,
      "theme": "light"
    }
  }
}
```

**Error Responses:**
- `400` - Missing email/password
- `401` - Invalid credentials
- `403` - Account deactivated

---

### 4. Verify Token

**GET** `/api/auth/verify`

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**cURL Command:**
```bash
curl http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**PowerShell Command:**
```powershell
$token = "YOUR_TOKEN_HERE"
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/verify" -Headers @{Authorization="Bearer $token"}
```

**Expected Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "test@example.com",
    "usageStats": {
      "dailyCount": 0,
      "lastResetDate": "2026-02-05T16:47:33.000Z",
      "totalEnhancements": 0,
      "dailyLimit": 50
    },
    "preferences": {
      "saveHistory": true,
      "theme": "light"
    },
    "createdAt": "2026-02-05T16:47:33.000Z"
  }
}
```

**Error Responses:**
- `401` - No token provided, invalid token, or expired token
- `404` - User not found

---

## Testing Flow

1. **Start the server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Create a test user** (signup):
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"email":"john@example.com","password":"test1234"}'
   ```

3. **Save the token** from the response

4. **Login with same credentials:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"john@example.com","password":"test1234"}'
   ```

5. **Verify token:**
   ```powershell
   $token = "PASTE_YOUR_TOKEN_HERE"
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/verify" -Headers @{Authorization="Bearer $token"}
   ```

---

## Postman Collection (Optional)

If using Postman, create a new collection with these requests:

1. **Environment Variable:**
   - `base_url`: `http://localhost:5000`
   - `token`: (will be auto-saved from login/signup)

2. **Tests Script** (add to signup/login requests):
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.token);
   ```

3. **Authorization Header** (for verify endpoint):
   - Type: Bearer Token
   - Token: `{{token}}`

---

## Expected Server Output

When requests are made, you should see logs like:
```
🚀 Server running on port 5000
📍 Environment: development
✅ MongoDB Connected: ac-xxx.mongodb.net
```

All authentication is working if:
- ✅ Signup creates new user and returns token
- ✅ Login with correct credentials returns token
- ✅ Login with wrong password returns 401 error
- ✅ Verify endpoint returns user data when valid token provided
- ✅ Verify endpoint returns 401 when invalid/no token provided

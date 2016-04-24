# Subway-Status
Get the latest NYC subway status for your train.

Setup
=====
1. Run `npm install` to retrieve modules
2. Run `node server.js` to start server
3. Access at `http://localhost:8080` (`/api` for API routes)

Usage
=====

/api/get/{train}
-----------------
Get status for a given train ('n', 'q', etc.).

`http://localhost:8080/get/{train}`

Response Example
```
{
  "line": "NQR",
  "status": "PLANNED WORK",
  "text": "<html>subway HTML</html>"
}
```

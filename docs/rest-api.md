# REST API documentation

These endpoints are open and do not currently require authentication.

Each response contains a `success` boolean field to indicate if the requested operation was successful or not. A `payload` variable is returned upon normal response with data related to the completed operation. An `error` field is attached with details of the failure when the request could not be completed.

## Vehicle related endpoints

### **1. List vehicles**

Returns all vehicles found in the database in one array.

Example request

`GET testapi.com/vehicles`

Example response

```js
{
    "success": true,
    "payload": [
        {
            "location": {
                "latitude": 47.3799174,
                "longitude": 8.5367373
            },
            "fuel": {
                "level": 80,
                "liters": 38
            },
            "_id": "5d839da7870c4a6fea841aae",
            "registration": "ZH - TEST 123",
            "mileage": 4356.5,
            "bat": "GOOD",
            "createdAt": "2019-09-19T15:24:23.743Z",
            "updatedAt": "2019-09-23T20:27:59.870Z",
            "__v": 0
        },
        {
          ...
        },
        ...
    ]
}
```


### **2. Update a vehicle**

Updates the registartion number of a given vehicle. Must match the document ID found in the database and provide the new registartion number of the vehicle. On successfull update, it returns the updated document in the payload.

Example request

`PUT testapi.com/vehicles/{document-id}`

Example request body

```js
{
  "newRegistrationNumber": "ZH - TEST 123"
}
```

Example response

```js
{
    "success": true,
    "payload": {
        "location": {
            "latitude": 47.3799174,
            "longitude": 8.5367373
        },
        "fuel": {
            "level": 80,
            "liters": 38
        },
        "_id": "5d839da7870c4a6fea841aae",
        "registration": "ZH - TEST 123",
        "mileage": 4356.5,
        "bat": "GOOD",
        "createdAt": "2019-09-19T15:24:23.743Z",
        "updatedAt": "2019-09-23T20:27:59.870Z",
        "__v": 0
    }
}
```

Example error response

```js
{
    "success": false,
    "error": "Must provide a valid document ID and registration number."
}
```

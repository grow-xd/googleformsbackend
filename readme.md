# Google Forms Backend

This is a simple backend server that replicates basic functionality of Google Forms using Express and TypeScript made for SlidelyAI task.


## How to run the server

1. Clone the repository:
    ```bash
    git clone https://github.com/grow-xd/googleformsbackend.git
    cd googleformsbackend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm run start
    ```

## API Documentation

The server's APIs are defined in the `src/index.ts` file. Here is an overview of the available APIs:


## Endpoints

### GET /ping

Check if the server is running.

**Response:**

- Success: 200 OK
    ```json
    {
        "success": true
    }
    ```

### POST /submit

Submit a new entry.

**Request Body:**

- name (string, required): Name of the submitter.
- email (string, required): Email of the submitter.
- phone (string, required): Phone number of the submitter.
- github_link (string, required): GitHub link of the submitter.
- stopwatch_time (string, required): Stopwatch time of the submitter.

**Response:**

- Success: 201 Created
    ```json
    {
        "success": true,
        "submission": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:10:30",
            "timestamp": "2022-01-01T12:00:00.000Z"
        }
    }
    ```

- Error: 400 Bad Request
    ```json
    {
        "error": "All fields are required."
    }
    ```

- Error: 403 Forbidden
    ```json
    {
        "error": "Submission limit reached."
    }
    ```

### GET /submissions

Get all submissions.

**Response:**

- Success: 200 OK
    ```json
    [
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:10:30",
            "timestamp": "2022-01-01T12:00:00.000Z"
        },
        ...
    ]
    ```

### GET /read

Get a specific submission by index.

**Query Parameters:**

- index (number, required): Index of the submission.

**Response:**

- Success: 200 OK
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "00:10:30",
        "timestamp": "2022-01-01T12:00:00.000Z"
    }
    ```

- Error: 400 Bad Request
    ```json
    {
        "error": "Invalid index."
    }
    ```

- Error: 404 Not Found
    ```json
    {
        "error": "Submission not found."
    }
    ```

### DELETE /delete

Delete a specific submission by index.

**Query Parameters:**

- index (number, required): Index of the submission.

**Response:**

- Success: 200 OK
    ```json
    {
        "success": true,
        "deletedSubmission": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:10:30",
            "timestamp": "2022-01-01T12:00:00.000Z"
        }
    }
    ```

- Error: 400 Bad Request
    ```json
    {
        "error": "Invalid index."
    }
    ```

- Error: 404 Not Found
    ```json
    {
        "error": "Submission not found."
    }
    ```

### PUT /edit

Edit a specific submission by index.

**Query Parameters:**

- index (number, required): Index of the submission.

**Request Body:**

- name (string): Updated name of the submitter.
- email (string): Updated email of the submitter.
- phone (string): Updated phone number of the submitter.
- github_link (string): Updated GitHub link of the submitter.
- stopwatch_time (string): Updated stopwatch time of the submitter.

**Response:**

- Success: 200 OK
    ```json
    {
        "success": true,
        "updatedSubmission": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:10:30",
            "timestamp": "2022-01-01T12:00:00.000Z"
        }
    }
    ```

- Error: 400 Bad Request
    ```json
    {
        "error": "Invalid index."
    }
    ```

- Error: 404 Not Found
    ```json
    {
        "error": "Submission not found."
    }
    ```

### GET /submissions/group

Get all submissions that match a specific email.

**Query Parameters:**

- email (string, required): Email to filter submissions.

**Response:**

- Success: 200 OK
    ```json
    [
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:10:30",
            "timestamp": "2022-01-01T12:00:00.000Z"
        },
        ...
    ]
    ```

- Error: 400 Bad Request
    ```json
    {
        "error": "Email is required."
    }
    ```


# pursuit-of-trivia

## API Server Guide

# Pre-Requisites

- Have node installed
- Have docker installed and running
- AtlasDB account with running cluster
- Firebase Auth

# Installation

Backend

1. Clone the repository
2. cd into the server folder
3. run npm install
4. Create a `.env` file inside the server folder with the following keys
   `ATLAS_USER`
   `ATLAS_PASS`
   `ATLAS_DB_DEV`
   Values can be found in Atlas
5. Edit the value of `mongoDbUrl` in `dbConnection.js` to suit Atlas configuration
6. Execute the startDev.sh script
   - you made need to edit permissions on the file `chmod +x startDev.sh`
7. Wait for the docker container to be ready (look for the following log message)
   - quiz_dev_api (Server is listening on port 5000!)

# Usage

Available APIs

#### GET

- `/` - Greeting message
- `/user/{id}` - Retrieve a single user based on their firebase id
- `/rooms` - Retrieve all quiz lobby rooms
- `/rooms/open` - Retrieve all open quiz lobby rooms
- `/rooms/{id}` - Retrieve a single room object based on it's id
- `/quiz/{id}` - Retrive a single quiz object based on it's id
- `/highscores` - Retrive all user high scores

#### POST

- `/user` - Create a new user (requires a corresponding user in firebase)
  This requires a json payload in the following format...

  ```
  {
      "firebase_id": "",
      "username": ""
  }
  ```

- `/rooms` - Create a new room
  This requires a json payload in the following format...

  ```
  {
    "name": "",
  	"owner": "firebase_id for room host",
  	"max_room_size": 3,
  	"public_room": true
    "entry_pass": ""
  }
  ```

  max_room_size limits how many people can join
  entry_pass is only required if public_room is false (private room)

- `/rooms/{roomId}/join/{userFirebaseId}` - Add a user to a room's list of participants
  This requires no json payload

- `/rooms/{roomId}/leave/{userFirebaseId}` - Remove a user from a room's list of participants
  This requires no json payload

- `/quiz/`
  This requires a json payload in the following format...

  ```
  {
    "room_id":"",
    "category":9,
    "difficulty":"medium",
    "num_questions":10
  }
  ```

  category refers to the categories on `opentb.com`

#### PATCH

- `/user/{firebaseId}` - Updates a user username or avatar url
  This requires a json payload in the following format...

  ```
  {
    "value":""
    "type":""
  }
  ```

  value is value to set in the database
  type can be username or avatar

- `/user/{firebaseId}/highscore/{score}` - Sets or updates a user high score value
  This requires no json payload

- `/rooms/{roomId}/close` - Sets a room's open status to false
  This requires no json payload

### DELETE

- `/user/{firebaseId}` - Delete a specific user
  This requires no json payload

######## CHANGELOG ##########

- initial environment code
- add model and routes for creating rooms
- add user model and routes
- quiz routing
- patch route added to user model
- show route for user
- add check for existing usernames
- remove requirement for avatar_url on user create
- add highscore to user model
- add delete route to users
- map and sort for highscores
- add axios for quiz api call
- create quiz logic
- adding tests
- add leave and join room methods and routes
- add delete user endpoint
- quiz integration tests
- fixes for room join and leave tests
- refactor allScores method
- return full quiz object on create
- return full room object on create
- config added for heroku
- correct status codes
- change logic for mongo connections
- add route to close room and only retrieve open rooms
- amend user update route to allow different updates for username and avatar
- add logic so room creates as closed and addQuiz opens it
- correct high score sorting and include avatars
- parse high scores as integers
- update README

########### BUGS / OUTSTANDING DEV ###########

- [] Improve data validation
- [] Increased error handling
- [] Don't allow same user to join a room multiple times

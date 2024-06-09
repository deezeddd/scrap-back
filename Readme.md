


### Papa Scrap Backend

## Introduction
    Backend made in nodeJS and ExpressJS with the AUTH added along with Login/signup functionalities, used JWT token for handling.
    Added MongoDB connection (URL not included). 
    
## FLOW
    -Routes/user -> Handles Login/signup functionalities
    -Routes/rateList-> Handles Rate List CRUD
    -Model/user -> Handles User Models
    -Model/rate -> Handles Rate Models
    -Service/auth -> Handles Token set and validate method (Used Cookies to store)
    -Middleware/authentication
    -Function/connections -> MongoDb connection
    -Function/sendmail -> Nodemailer mail configuration


## Note 
    Feel Free to fork and use it for personal use. This is a basic starter to create a backend using nodeJs and expressJS.

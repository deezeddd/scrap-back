
### Papa Scrap Backend

## FLOW
    -Routes/user -> Handles Login/signup functionalities
    -Routes/rateList-> Handles Rate List CRUD
    -Model/user -> Handles User Models
    -Model/rate -> Handles Rate Models
    -Service/auth -> Handles Token set and validate method (Used Cookies to store)
    -Middleware/authentication
    -Function/connections -> MongoDb connection
    -Function/sendmail -> Nodemailer mail configuration
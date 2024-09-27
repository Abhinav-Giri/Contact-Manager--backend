const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");  
const userRoutes = require("./routes/userRoutes");  
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection")

const port = process.env.PORT || 3001;

connectDb();

app.use(express.json());
app.use(errorHandler)

app.use("/contacts", contactRoutes)
app.use("/users", userRoutes)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
const constants = require("../constants")

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Error" , message: err.message, stackTrace: err.stack});
            
            break;
    case constants.UNAUTHORIZED:
        res.json({title: "Unauthorized Error" , message: err.message, stackTrace: err.stack});
break;

        case constants.FORBIDDEN:
            res.json({title: "Forbidden Error" , message: err.message, stackTrace: err.stack});
break;

            case constants.SERVER:
    res.json({title: "Server Error" , message: err.message, stackTrace: err.stack});
break;

case constants.NOT_FOUND:
    res.json({title: "Page not found" , message: err.message, stackTrace: err.stack});
break;
case constants.ALREADY_EXISTS:
    res.json({title: "User already exists" , message: err.message, stackTrace: err.stack});
break;


        default:
            console.log("No Errors, All good!")
            break;
    }

    // next();

}
module.exports = errorHandler;
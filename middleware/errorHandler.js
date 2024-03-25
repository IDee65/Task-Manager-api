const errorHandlerMw = (err,req,res,next) => {
    return res.status(500).json({message:`Something went wrong, try again later`});
};

module.exports = errorHandlerMw;
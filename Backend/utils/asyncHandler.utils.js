

const asyncHandler = (asyncfn)=>{
    return (req,res,next) =>{
        Promise
        .resolve(asyncfn(req,res,next))
        .catch((error) => next(error))

    };
};


export default asyncHandler;
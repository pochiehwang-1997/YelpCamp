function catchAsync(func){
    return (res, req, next)=>{
        func(res, req, next).catch(next);
    }
}

module.exports = catchAsync;
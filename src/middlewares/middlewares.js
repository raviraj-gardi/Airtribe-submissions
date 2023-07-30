const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { Enums } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateCreateRequest(req, res, next) {
    error_explaination = [];

    if(!req.body.task_title){
        error_explaination.push('Incorrect title');
    }
    if(!req.body.task_description){
        error_explaination.push('Incorrect description');
    }
    if(req.body.id){
        error_explaination.push('User Incorrect task id ');
    }
    if(req.body.flag && !(req.body.flag in Enums.FLAG_TYPES)){
        error_explaination.push(' Invalid flag');
    }
    if(req.body.priority && !(req.body.priority in Enums.PRIORITY_LEVEL)){
        error_explaination.push('Invalid priority ');
    }
    if(error_explaination.length > 0){
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    const allowedFields = ['task_title', 'task_description','flag','priority'];
    let error_explaination = [];
    if(req.body.flag && !(req.body.flag in Enums.FLAG_TYPES)){
        error_explaination.push('Invalid flag');
    }
    if(req.body.priority  && !(req.body.priority in Enums.PRIORITY_LEVEL)){
        error_explaination.push('Invalid priority ');
    }
    if(req.body.id){
        error_explaination.push('Invalid id');
    }
    const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
    if(extraFields.length > 0){
        error_explaination.push(`Invalid request: ${extraFields.join(', ')}`);
    }
    if(error_explaination.length > 0){
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validatePriorityRequest(req,res,next){
    if(!(req.params.level.toUpperCase() in Enums.PRIORITY_LEVEL)){
        ErrorResponse.message = 'Something went wrong ';
        ErrorResponse.error = new AppError('Invalid priority level ', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest,
    validatePriorityRequest
}
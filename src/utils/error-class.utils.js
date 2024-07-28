
export class errorHandlingClass{
    constructor(message,statusCode,error,stack){
       this.message=message;
       this.statusCode=statusCode;
       this.error=error;
       this.stack=stack
    }
   }
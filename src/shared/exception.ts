export class HttpError extends Error {
    public statusCode: number;
  
    public message: string;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  export class UnAuthorizedError extends HttpError {
    constructor() {
      super(401, 'Unauthorized');
    }
  }
  
  export class ConflictError extends HttpError {
    constructor(message: string) {
      super(409, message);
    }
  }
  
  export class ExpiredTokenError extends HttpError {
    constructor() {
      super(401, 'Expired Token');
    }
  }
  
  export class ForbiddenError extends HttpError {
    constructor() {
      super(403, 'Forbidden Request');
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor() {
      super(404, `Not Found`);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string) {
      super(400, message);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor() {
      super(500, 'Interal Server Error');
    }
  }  
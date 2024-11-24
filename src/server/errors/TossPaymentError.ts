export class TossPaymentError extends Error{
    code: string;
    orderId:string;

    constructor(code:string, message:string, orderId: string) {
        super(message);
        this.name = this.constructor.name;
        this.orderId = orderId;
        this.code = code;

        Error.captureStackTrace(this, this.constructor);


    }
}
export interface IConnection {
    _id: string;
    ip: string;
    customer: {
        email: string;
        firstName: string;
        lastName: string;
    };
}

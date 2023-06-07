import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    age: string;
    imagePath: string;
    mobileNumber: string;
    typeUser: "student" | "professor";
    classes: [];
}

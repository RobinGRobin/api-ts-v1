import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    age: number;
    imagePath: string;
    mobileNumber: string;
    typeUser: "student" | "professor";
    classes: [];
}

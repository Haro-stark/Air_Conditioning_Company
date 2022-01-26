<<<<<<< HEAD
import { Role } from "./Role";
import { Roles } from "./Roles";

export interface User {
    uid: string;
    email: string;
    roles: Roles;
    role?: Role;
=======
import { Roles } from './Roles'


export interface User {
    username?: string;
    uid: any;
    email: any;
    role: string;
>>>>>>> 6f961c7353b6f05ddb6096ba65a314ab6a7e6929
}
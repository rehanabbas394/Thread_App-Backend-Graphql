import { createHmac, randomBytes } from "crypto";
import { Prismaclient } from "../lib/db";
import jwt from "jsonwebtoken";

// jwt secret
const secret = "RehanAbbas@1234"

export interface createUserpayload{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface loginpayload{
    email:string,
    password:string
}

export interface jwtpayload{
    id:string,
    email:string
}

class UserService {

    private static hashedpassword(password:string,salt:string){
        const hashpassword =  createHmac('sha256',salt).update(password).digest('hex')
        return hashpassword
    }
    private static generatetoken(payload:jwtpayload){
        const token = jwt.sign(payload, secret);
        return token
    }

    public static async getUserbyid(id:string){
        return Prismaclient.user.findUnique({where:{id}})
    }

    public static createUser(payload:createUserpayload){
        const {firstName,lastName,email,password,} = payload
        const salt = randomBytes(32).toString('hex')
        const hashpassword =  UserService.hashedpassword(password,salt)
        return Prismaclient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password:hashpassword,
                salt,
            }
        })
    }

    public static async findUserbyemail(email:string){
        return Prismaclient.user.findUnique({where:{email}})
    }

    public static async loginUser(payload:loginpayload){
        const { email, password } = payload
        const user = await UserService.findUserbyemail(email)
        if (!user){
            throw new Error('User not found')
        }
        const salt = user.salt
        const hashpassword = UserService.hashedpassword(password,salt)
        if (hashpassword != user.password){
            throw new Error('Invalid password')
        } 
        const token = UserService.generatetoken({id:user.id,email:user.email}) 
        console.log(token)
        return token 
    }

    public static async decodeToken(token:string){
        return jwt.verify(token,secret)
    }
}

export default UserService;
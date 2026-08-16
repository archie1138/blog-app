import {Account, Client, ID} from 'appwrite' ;
import conf from '../conf/conf.js'

class AuthService {
    client = new Client() ;
    account ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId) ;
        this.account = new Account(this.client) ;
    }

    async createAccount({name, email, password}){
        return await this.account.create({
            userId : ID.unique(),
            name, 
            email, 
            password
        }) ;
    }

    async login({email, password}){
        const user = await this.account.createEmailPasswordSession({
            email, 
            password
        }) ;
        return user ;
    }

    async getCurrentUser(){
        return await this.account.get() ;
    }

    async logout(){
        try{
            await this.account.deleteSessions() ;
            return true ;
        }
        catch(e){
            console.error("Appwrite service :: logout :: error " , e) ; 
            return false ;
        }
    }
}

const authService = new AuthService() ; 

export default authService ;
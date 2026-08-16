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
        try{
            return await this.account.create({
                userId : ID.unique(),
                name, 
                email, 
                password
            }) ;
        }
        catch(e){
            console.error("Appwrite service :: createAccount :: error " , e) ; 
            return null ;
        }
    }

    async login({email, password}){
        try{
            const user = await this.account.createEmailPasswordSession({
                email, 
                password
            }) ;
            return user ;
        }
        catch(e){
            console.error("Appwrite service :: login :: error " , e) ; 
            return null ;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get() ;
        }
        catch(e){
            console.error("Appwrite service :: getCurrentUser :: error " , e) ; 
            return null ;
        }
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
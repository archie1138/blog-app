import {Client, Query, TablesDB} from 'appwrite'
import conf from '../conf/conf.js'

class DatabaseService{
    client = new Client() ;
    tablesDB;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client) 
    }

    async createPost({slug, title, content, featuredImage, status, userId}){
        try{
            return await this.tablesDB.createRow({
                databaseId : conf.appwriteDatabaseId,
                tableId : conf.appwriteTableId,
                rowId : slug,
                data : {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        }
        catch(e){
            console.error("Appwrite service :: createPost :: error " , e) ;
            return null ;
        }
    }

    async updatePost({slug, title, content, featuredImage, status}){
        try{
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data : {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        }
        catch(e){
            console.error("Appwrite service :: updatePost :: error " , e) ;
            return null ;
        }
    }

    async deletePost(slug){
        try{
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            })
            return true ;
        }
        catch(e){
            console.error("Appwrite service :: deletePost :: error " , e) ;
            return false ;
        }
    }

    async getPost(slug){
        try{
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            })
        }
        catch(e){
            console.error("Appwrite service :: getPost :: error " , e) ;
            return null ;
        }
    }

    async getPosts(){
        try{
            return await this.tablesDB.listRows({
                databaseId : conf.appwriteDatabaseId,
                tableId : conf.appwriteTableId,
                queries : [
                    Query.equal("status", ["active"])
                ]
            })
        }
        catch(e){
            console.error("Appwrite service :: getPosts :: error " , e) ;
            return null ;
        }
    }

    async getUserPosts(userId){
        try{
            return await this.tablesDB.listRows({
                databaseId : conf.appwriteDatabaseId,
                tableId : conf.appwriteTableId,
                queries : [
                    Query.equal("userId", [userId])
                ]
            })
        }
        catch(e){
            console.error("Appwrite service :: getUserPosts :: error " , e) ;
            return null ;
        }
    }
}

const databaseService = new DatabaseService() ;

export default databaseService ;
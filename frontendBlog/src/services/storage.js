import { Client, Storage, ID } from "appwrite";
import conf from '../conf/conf.js'

class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId)
        
        this.storage = new Storage(this.client) 
    }

    async uploadFile(file){
        try{
            return await this.storage.createFile({
                bucketId : conf.appwriteBucketId,
                fileId : ID.unique(),
                file
            })
        }
        catch(e){
            console.error("Appwrite service :: uploadFile :: error " , e) ;
            return null ;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile({
                bucketId : conf.appwriteBucketId,
                fileId
            })
            return true ;
        }
        catch(e){
            console.error("Appwrite service :: deleteFile :: error " , e) ;
            return false ;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview({
            bucketId : conf.appwriteBucketId,
            fileId,
        })
    }
}

const storageService = new StorageService() ;

export default storageService 
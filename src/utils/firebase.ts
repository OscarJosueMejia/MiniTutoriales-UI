import { initializeApp } from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MSGSENDERID,
    appId: process.env.REACT_APP_FB_APPID,
};

/**
 * Upload a Image (FILE) to Firebase Bucket
 * @param file 
 * @param folderName 
 */
export async function uploadImage(file:File, folderName:string) {
    try {
        initializeApp(firebaseConfig);
    
        const storage = getStorage();
        const storageRef = ref(storage, 
            `/${folderName}/${new Date().getTime() + Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 5000)}`);
    
        const result = await uploadBytes(storageRef, file)
        .then(snapshot=>{
            return snapshot.ref;
        })
    
        return await getDownloadURL(result).then((downloadURL)=>{return downloadURL}); 

    } catch (error) {
        console.log(error);
    }
}


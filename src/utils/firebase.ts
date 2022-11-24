import { initializeApp } from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

/**
 * Upload a Image (FILE) to Firebase Bucket
 * @param file 
 */
export async function uploadImage(file:File) {
    try {
        initializeApp(firebaseConfig);
    
        const storage = getStorage();
        const storageRef = ref(storage, 
            `/StepImages/${new Date().getTime() + Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 5000)}`);
    
        const result = await uploadBytes(storageRef, file)
        .then(snapshot=>{
            return snapshot.ref;
        })
    
        return await getDownloadURL(result).then((downloadURL)=>{return downloadURL}); 

    } catch (error) {
        console.log(error);
    }
}


import { initializeApp } from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3et_6HhMcyG8St9EDp7D7uT8flTGSets",
    authDomain: "minitutoriales-resources.firebaseapp.com",
    projectId: "minitutoriales-resources",
    storageBucket: "minitutoriales-resources.appspot.com",
    messagingSenderId: "518591558577",
    appId: "1:518591558577:web:36ffc9859dcde00b8a4390"
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


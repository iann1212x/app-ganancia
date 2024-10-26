// services/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'TU_API_KEY', // Debes colocar tu clave API aquí
    authDomain: 'appgan-8abdb.firebaseapp.com', // Nombre del dominio de autenticación
    projectId: 'appgan-8abdb', // ID de tu proyecto
    storageBucket: 'appgan-8abdb.appspot.com', // Bucket de almacenamiento
    messagingSenderId: '706610100373', // Número del proyecto
    appId: '1:706610100373:android:5cd69383c9294a0f6f439c', // ID de la app que descargaste
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

import Geolocation from '@react-native-community/geolocation';

const getUserLocation = (userId) => {
    Geolocation.getCurrentPosition(
        async (position) => {
            const country = await getCountryFromPosition(position.coords);
            const userRef = db.collection('users').doc(userId);
            await userRef.set({ country }, { merge: true });
        },
        (error) => console.error('Error obteniendo la ubicación:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};

const getCountryFromPosition = async (coords) => {
    // Integración con API de geolocalización (como ipapi.co)
};

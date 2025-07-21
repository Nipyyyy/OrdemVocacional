import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANTE: Substitua estas configurações pelas suas próprias do Firebase Console
const firebaseConfig = {
  // SUBSTITUA PELAS SUAS CONFIGURAÇÕES REAIS DO FIREBASE!
  // Siga os passos abaixo para obter suas configurações:
  apiKey: "AIzaSyC8aT5WPqilRDGkx9YCVbHU2Fbvs3kV1M8",
  authDomain: "ordem-vocacional.firebaseapp.com",
  projectId: "ordem-vocacional", 
  storageBucket: "ordem-vocacional.firebasestorage.app",
  messagingSenderId: "93352456087",
  appId: "1:93352456087:web:6f66cbfb28d4544c2d9ed2",
  measurementId: "G-NNS3FVMP7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider com configurações específicas
export const googleProvider = new GoogleAuthProvider();

// Configurações importantes para o Google Auth
googleProvider.setCustomParameters({
  prompt: 'select_account', // Força seleção de conta
  hd: undefined // Remove restrição de domínio se houver
});

// Adiciona escopos necessários
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
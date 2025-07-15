import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANTE: Substitua estas configurações pelas suas próprias do Firebase Console
const firebaseConfig = {
  // Vá para Firebase Console > Configurações do projeto > Configuração do SDK
  // e copie suas configurações reais aqui
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "seu-projeto.firebaseapp.com", // Deve terminar com .firebaseapp.com
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqr"
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
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  updateUserEmail: (newEmail: string, currentPassword: string) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteUserAccount: (password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Busca dados adicionais do usuário no Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          let userData: UserProfile;
          
          if (userDoc.exists()) {
            userData = userDoc.data() as UserProfile;
            // Atualiza o último login
            await setDoc(userDocRef, {
              ...userData,
              lastLoginAt: new Date().toISOString(),
              emailVerified: firebaseUser.emailVerified
            }, { merge: true });
          } else {
            // Cria perfil do usuário se não existir
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Usuário',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || undefined,
              emailVerified: firebaseUser.emailVerified,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString()
            };
            
            await setDoc(userDocRef, userData);
          }
          
          setUser(userData);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Verifica se há resultado de redirecionamento do Google
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // Usuário logou via redirecionamento
          console.log('Login via redirecionamento bem-sucedido');
        }
      } catch (error) {
        console.error('Erro no redirecionamento:', error);
      }
    };

    checkRedirectResult();

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError): string => {
    console.error('Auth Error:', error.code, error.message);
    
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Verifique o e-mail informado.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Tente novamente.';
      case 'auth/invalid-email':
        return 'E-mail inválido. Verifique o formato do e-mail.';
      case 'auth/user-disabled':
        return 'Esta conta foi desabilitada. Entre em contato com o suporte.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está sendo usado por outra conta.';
      case 'auth/weak-password':
        return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet e tente novamente.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas de login. Tente novamente mais tarde.';
      case 'auth/invalid-credential':
        return 'Credenciais inválidas. Verifique e-mail e senha.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelado pelo usuário.';
      case 'auth/popup-blocked':
        return 'Pop-up bloqueado pelo navegador. Permita pop-ups e tente novamente.';
      case 'auth/cancelled-popup-request':
        return 'Solicitação de pop-up cancelada. Tente novamente.';
      case 'auth/unauthorized-domain':
        return 'Domínio não autorizado. Verifique as configurações do Firebase.';
      case 'auth/invalid-api-key':
        return 'Chave de API inválida. Verifique as configurações do Firebase.';
      case 'auth/app-deleted':
        return 'Aplicação Firebase foi deletada. Verifique as configurações.';
      case 'auth/invalid-user-token':
        return 'Token de usuário inválido. Faça login novamente.';
      case 'auth/user-token-expired':
        return 'Token expirado. Faça login novamente.';
      case 'auth/null-user':
        return 'Usuário não encontrado. Faça login novamente.';
      case 'auth/invalid-tenant-id':
        return 'ID do tenant inválido.';
      case 'auth/tenant-id-mismatch':
        return 'ID do tenant não corresponde.';
      default:
        return `Erro inesperado: ${error.message}. Tente novamente ou entre em contato com o suporte.`;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        throw new Error('Por favor, verifique seu e-mail antes de fazer login. Verifique sua caixa de entrada e spam.');
      }
    } catch (error: any) {
      if (error.message.includes('verifique seu e-mail')) {
        throw new Error(error.message);
      }
      throw new Error(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualiza o perfil do usuário com o nome
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Cria documento do usuário no Firestore
      const userData: UserProfile = {
        uid: userCredential.user.uid,
        name,
        email,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      // Envia e-mail de verificação
      await sendEmailVerification(userCredential.user);
      
      // Faz logout para forçar verificação de e-mail
      await signOut(auth);
      
      throw new Error('Conta criada com sucesso! Verifique seu e-mail para ativar sua conta antes de fazer login.');
    } catch (error: any) {
      if (error.message.includes('Conta criada com sucesso')) {
        throw new Error(error.message);
      }
      throw new Error(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Detecta se é mobile para usar redirecionamento
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      let result;
      
      if (isMobile) {
        // Em dispositivos móveis, usa redirecionamento
        await signInWithRedirect(auth, googleProvider);
        return; // O resultado será tratado no useEffect
      } else {
        // Em desktop, usa popup
        result = await signInWithPopup(auth, googleProvider);
      }
      
      if (result) {
        // Cria ou atualiza documento do usuário no Firestore
        const userData: UserProfile = {
          uid: result.user.uid,
          name: result.user.displayName || 'Usuário Google',
          email: result.user.email || '',
          photoURL: result.user.photoURL || undefined,
          emailVerified: result.user.emailVerified,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', result.user.uid), userData, { merge: true });
      }
    } catch (error: any) {
      console.error('Erro detalhado do Google Auth:', error);
      throw new Error(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Erro ao fazer logout. Tente novamente.');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login',
        handleCodeInApp: false
      });
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };

  const sendVerificationEmail = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error('Usuário não está logado.');
      }
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };

  const updateUserProfile = async (name: string, photoURL?: string) => {
    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está logado.');
      }

      // Prepara os dados para atualização
      const updateData: { displayName: string; photoURL?: string } = {
        displayName: name
      };
      
      if (photoURL !== undefined) {
        updateData.photoURL = photoURL;
      }

      // Atualiza o perfil no Firebase Auth
      await updateProfile(auth.currentUser, updateData);

      // Prepara os dados para o Firestore
      const firestoreData: { name: string; lastLoginAt: string; photoURL?: string } = {
        name,
        lastLoginAt: new Date().toISOString()
      };
      
      if (photoURL !== undefined) {
        firestoreData.photoURL = photoURL;
      }

      // Atualiza o documento no Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, firestoreData, { merge: true });

      // Atualiza o estado local
      setUser(prev => {
        if (!prev) return null;
        const updatedUser = { ...prev, name };
        if (photoURL !== undefined) {
          updatedUser.photoURL = photoURL;
        }
        return updatedUser;
      });
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };

  const updateUserEmail = async (newEmail: string, currentPassword: string) => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('Usuário não está logado.');
      }

      // Reautentica o usuário
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Atualiza o e-mail
      await updateEmail(auth.currentUser, newEmail);

      // Envia verificação para o novo e-mail
      await sendEmailVerification(auth.currentUser);

      // Atualiza o documento no Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, {
        email: newEmail,
        emailVerified: false,
        lastLoginAt: new Date().toISOString()
      }, { merge: true });

      // Atualiza o estado local
      setUser(prev => prev ? { ...prev, email: newEmail, emailVerified: false } : null);
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('Usuário não está logado.');
      }

      // Reautentica o usuário
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Atualiza a senha
      await updatePassword(auth.currentUser, newPassword);
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };

  const deleteUserAccount = async (password: string) => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('Usuário não está logado.');
      }

      // Reautentica o usuário
      const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Remove o documento do Firestore
      // Note: Em produção, você pode querer manter alguns dados por questões legais
      // const userDocRef = doc(db, 'users', auth.currentUser.uid);
      // await deleteDoc(userDocRef);

      // Deleta a conta do usuário
      await deleteUser(auth.currentUser);
    } catch (error: any) {
      throw new Error(handleAuthError(error));
    }
  };
  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    sendVerificationEmail,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    deleteUserAccount,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
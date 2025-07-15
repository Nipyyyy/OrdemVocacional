import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationContainer';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut, 
  Edit3, 
  Save, 
  X,
  AlertTriangle,
  Camera,
  Lock,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

interface EditMode {
  name: boolean;
  email: boolean;
  password: boolean;
}

interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const { user, logout, sendVerificationEmail, updateUserProfile, updateUserEmail, updateUserPassword, deleteUserAccount } = useAuth();
  const { addNotification } = useNotification();
  
  const [editMode, setEditMode] = useState<EditMode>({
    name: false,
    email: false,
    password: false,
  });
  
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [isLoading, setIsLoading] = useState({
    name: false,
    email: false,
    password: false,
    verification: false,
    delete: false,
  });
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);

  const handleEditToggle = (field: keyof EditMode) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
    
    // Reset form data when canceling edit
    if (editMode[field]) {
      setFormData(prev => ({
        ...prev,
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveName = async () => {
    if (!formData.name.trim()) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Nome não pode estar vazio',
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, name: true }));
    
    try {
      await updateUserProfile(formData.name.trim());
      setEditMode(prev => ({ ...prev, name: false }));
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Nome atualizado com sucesso!',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, name: false }));
    }
  };

  const handleSaveEmail = async () => {
    if (!formData.email.trim() || !formData.currentPassword) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, email: true }));
    
    try {
      await updateUserEmail(formData.email.trim(), formData.currentPassword);
      setEditMode(prev => ({ ...prev, email: false }));
      setFormData(prev => ({ ...prev, currentPassword: '' }));
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'E-mail atualizado! Verifique sua nova caixa de entrada.',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleSavePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Preencha todos os campos de senha',
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'As senhas não coincidem',
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'A nova senha deve ter pelo menos 8 caracteres',
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, password: true }));
    
    try {
      await updateUserPassword(formData.currentPassword, formData.newPassword);
      setEditMode(prev => ({ ...prev, password: false }));
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Senha atualizada com sucesso!',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleSendVerification = async () => {
    setIsLoading(prev => ({ ...prev, verification: true }));

    try {
      await sendVerificationEmail();
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'E-mail de verificação enviado!',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, verification: false }));
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Digite sua senha para confirmar a exclusão',
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, delete: true }));
    
    try {
      await deleteUserAccount(deletePassword);
      addNotification({
        type: 'success',
        title: 'Conta Excluída',
        message: 'Sua conta foi excluída permanentemente',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
      setShowDeleteConfirm(false);
      setDeletePassword('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      addNotification({
        type: 'info',
        title: 'Logout',
        message: 'Você foi desconectado com sucesso',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: error.message,
      });
    }
  };

  const handlePhotoSelect = async (photoURL: string) => {
    try {
      // Aqui você pode implementar a lógica para salvar a foto no Firebase Storage
      // Por enquanto, vamos apenas atualizar o perfil localmente
      await updateUserProfile(user?.name || '', photoURL);
      setShowPhotoSelector(false);
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao atualizar foto de perfil: ' + error.message,
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-cinzel font-bold text-accent-gold mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-300">Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-accent-gold mb-4">
              Meu Perfil
            </h1>
            <p className="text-gray-300">
              Gerencie suas informações pessoais e configurações da conta
            </p>
          </div>

          {/* Card do Perfil */}
          <div className="card">
            {/* Foto e Nome */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-dark-purple/50 border-2 border-accent-gold/30 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={`Foto de perfil de ${user.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-accent-gold" />
                  )}
                </div>
                <button 
                  onClick={() => setShowPhotoSelector(true)}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center hover:bg-accent-gold/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-dark-blue"
                  aria-label="Alterar foto de perfil"
                >
                  <Camera size={14} className="text-dark-blue" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-cinzel font-bold text-white mb-1">
                      {user.name}
                    </h2>
                    <p className="text-gray-300">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações da Conta */}
            <div className="space-y-6">
              {/* Nome */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Nome
                  </label>
                  <button
                    onClick={() => handleEditToggle('name')}
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors p-1 rounded-md hover:bg-accent-gold/10 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-dark-blue"
                    aria-label={editMode.name ? 'Cancelar edição do nome' : 'Editar nome'}
                  >
                    {editMode.name ? <X size={16} /> : <Edit3 size={16} />}
                  </button>
                </div>
                
                {editMode.name ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field w-full"
                      placeholder="Seu nome completo"
                      aria-label="Nome completo"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveName}
                        disabled={isLoading.name}
                        className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading.name ? (
                          <div className="w-4 h-4 border-2 border-dark-blue border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Save size={16} className="mr-2" />
                        )}
                        Salvar
                      </button>
                      <button
                        onClick={() => handleEditToggle('name')}
                        className="btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-dark-purple/30 rounded-md border border-light-purple/20">
                    <User size={16} className="text-gray-400" />
                    <span className="text-white">{user.name}</span>
                  </div>
                )}
              </div>

              {/* E-mail */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    E-mail
                  </label>
                  <button
                    onClick={() => handleEditToggle('email')}
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors p-1 rounded-md hover:bg-accent-gold/10 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-dark-blue"
                    aria-label={editMode.email ? 'Cancelar edição do e-mail' : 'Editar e-mail'}
                  >
                    {editMode.email ? <X size={16} /> : <Edit3 size={16} />}
                  </button>
                </div>
                
                {editMode.email ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field w-full"
                      placeholder="seu@email.com"
                      aria-label="Novo e-mail"
                    />
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className="input-field w-full"
                      placeholder="Senha atual para confirmar"
                      aria-label="Senha atual"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEmail}
                        disabled={isLoading.email}
                        className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading.email ? (
                          <div className="w-4 h-4 border-2 border-dark-blue border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Save size={16} className="mr-2" />
                        )}
                        Salvar
                      </button>
                      <button
                        onClick={() => handleEditToggle('email')}
                        className="btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 flex items-center space-x-2 p-3 bg-dark-purple/30 rounded-md border border-light-purple/20">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-white">{user.email}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.emailVerified 
                          ? 'bg-success/20 text-success' 
                          : 'bg-error/20 text-error'
                      }`}>
                        {user.emailVerified ? 'Verificado' : 'Não verificado'}
                      </div>
                    </div>
                    
                    {!user.emailVerified && (
                      <button
                        onClick={handleSendVerification}
                        disabled={isLoading.verification}
                        className="text-sm text-accent-gold hover:text-accent-gold/80 transition-colors disabled:opacity-50 focus:outline-none focus:underline"
                      >
                        {isLoading.verification ? 'Enviando...' : 'Reenviar e-mail de verificação'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Senha
                  </label>
                  <button
                    onClick={() => handleEditToggle('password')}
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors p-1 rounded-md hover:bg-accent-gold/10 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-dark-blue"
                    aria-label={editMode.password ? 'Cancelar alteração de senha' : 'Alterar senha'}
                  >
                    {editMode.password ? <X size={16} /> : <Lock size={16} />}
                  </button>
                </div>
                
                {editMode.password ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="input-field w-full pr-10"
                        placeholder="Senha atual"
                        aria-label="Senha atual"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                        aria-label={showPasswords.current ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                      >
                        {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="input-field w-full pr-10"
                        placeholder="Nova senha"
                        aria-label="Nova senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                        aria-label={showPasswords.new ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                      >
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="input-field w-full pr-10"
                        placeholder="Confirmar nova senha"
                        aria-label="Confirmar nova senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                        aria-label={showPasswords.confirm ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                      >
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSavePassword}
                        disabled={isLoading.password}
                        className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading.password ? (
                          <div className="w-4 h-4 border-2 border-dark-blue border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Save size={16} className="mr-2" />
                        )}
                        Alterar Senha
                      </button>
                      <button
                        onClick={() => handleEditToggle('password')}
                        className="btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-dark-purple/30 rounded-md border border-light-purple/20">
                    <Lock size={16} className="text-gray-400" />
                    <span className="text-white">••••••••</span>
                  </div>
                )}
              </div>

              {/* Informações adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data de Criação */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Membro desde
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-dark-purple/30 rounded-md border border-light-purple/20">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-white">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Último Login */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Último acesso
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-dark-purple/30 rounded-md border border-light-purple/20">
                    <Shield size={16} className="text-gray-400" />
                    <span className="text-white">
                      {new Date(user.lastLoginAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ações da Conta */}
              <div className="border-t border-light-purple/20 pt-6">
                <h3 className="text-lg font-cinzel font-semibold text-accent-gold mb-4">
                  Ações da Conta
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleLogout}
                    className="bg-error hover:bg-error/80 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-dark-blue"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair da Conta
                  </button>
                </div>
              </div>

              {/* Zona de Perigo */}
              <div className="border-t border-error/20 pt-6">
                <h3 className="text-lg font-cinzel font-semibold text-error mb-4">
                  Zona de Perigo
                </h3>
                
                <div className="bg-error/10 border border-error/30 rounded-md p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertTriangle size={20} className="text-error mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Excluir Conta</h4>
                      <p className="text-sm text-gray-300 mb-3">
                        Excluir sua conta é uma ação permanente e não pode ser desfeita. 
                        Todos os seus dados serão removidos permanentemente.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-error hover:bg-error/80 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-dark-blue"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-blue border border-error/30 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="delete-title"
              aria-describedby="delete-description"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle size={24} className="text-error" />
                <h3 id="delete-title" className="text-xl font-cinzel font-bold text-error">
                  Confirmar Exclusão
                </h3>
              </div>
              
              <p id="delete-description" className="text-gray-300 mb-6">
                Esta ação não pode ser desfeita. Digite sua senha para confirmar 
                que deseja excluir permanentemente sua conta.
              </p>
              
              <div className="space-y-4">
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="Digite sua senha"
                  aria-label="Senha para confirmar exclusão"
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading.delete || !deletePassword}
                    className="flex-1 bg-error hover:bg-error/80 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-dark-blue"
                  >
                    {isLoading.delete ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Trash2 size={16} className="mr-2" />
                    )}
                    Excluir Conta
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeletePassword('');
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Seleção de Foto */}
      <AnimatePresence>
        {showPhotoSelector && (
          <ProfilePhotoSelector
            currentPhotoURL={user.photoURL}
            onPhotoSelect={handlePhotoSelect}
            onClose={() => setShowPhotoSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, User, Check } from 'lucide-react';
import { useNotification } from './NotificationContainer';

interface Token {
  id: string;
  name: string;
  imagePath: string;
  category: string;
}

interface ProfilePhotoSelectorProps {
  currentPhotoURL?: string;
  onPhotoSelect: (photoURL: string) => void;
  onClose: () => void;
}

const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({
  currentPhotoURL,
  onPhotoSelect,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'tokens'>('upload');
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotification();

  // Tokens disponíveis organizados por categoria
  const availableTokens: Token[] = [
    // Medicina
    { id: 'medico-1', name: 'Médico Clínico', imagePath: '/src/assets/Medico Folha.png', category: 'Medicina' },
    { id: 'medica-1', name: 'Médica com Seringa', imagePath: '/src/assets/Medica Seringa.png', category: 'Medicina' },
    { id: 'medica-2', name: 'Médica com Oxímetro', imagePath: '/src/assets/Medica Pressão.png', category: 'Medicina' },
    { id: 'medico-2', name: 'Médico Emergencista', imagePath: '/src/assets/Medica Prancha.png', category: 'Medicina' },
    
    // Educação
    { id: 'prof-1', name: 'Professora de Matemática', imagePath: '/src/assets/Samara.png', category: 'Educação' },
    { id: 'prof-2', name: 'Professor de Artes', imagePath: '/src/assets/Marco.png', category: 'Educação' },
    { id: 'prof-3', name: 'Professora de Português', imagePath: '/src/assets/Renata.png', category: 'Educação' },
    
    // Adicione mais tokens conforme necessário
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Por favor, selecione apenas arquivos de imagem.',
      });
      return;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'A imagem deve ter no máximo 5MB.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      setSelectedToken(null);
    };
    reader.readAsDataURL(file);
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token.id);
    setUploadedImage(null);
  };

  const handleSave = () => {
    if (uploadedImage) {
      onPhotoSelect(uploadedImage);
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Foto de perfil atualizada com sucesso!',
      });
    } else if (selectedToken) {
      const token = availableTokens.find(t => t.id === selectedToken);
      if (token) {
        onPhotoSelect(token.imagePath);
        addNotification({
          type: 'success',
          title: 'Sucesso',
          message: 'Foto de perfil atualizada com sucesso!',
        });
      }
    }
    onClose();
  };

  const groupedTokens = availableTokens.reduce((acc, token) => {
    if (!acc[token.category]) {
      acc[token.category] = [];
    }
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, Token[]>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-dark-blue border border-light-purple/20 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-cinzel font-bold text-accent-gold">
            Alterar Foto de Perfil
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-dark-purple/30 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
              activeTab === 'upload'
                ? 'bg-accent-gold text-dark-blue font-medium'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Upload size={18} className="mr-2" />
            Fazer Upload
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
              activeTab === 'tokens'
                ? 'bg-accent-gold text-dark-blue font-medium'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <User size={18} className="mr-2" />
            Escolher Token
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="mb-6">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="border-2 border-dashed border-light-purple/30 rounded-lg p-8 hover:border-accent-gold/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-accent-gold/30">
                        <img
                          src={uploadedImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-secondary"
                      >
                        Escolher Outra Imagem
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera size={48} className="mx-auto text-gray-400" />
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">
                          Faça upload de uma foto
                        </h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Escolha uma imagem do seu dispositivo (máximo 5MB)
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="btn-primary"
                        >
                          Selecionar Arquivo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <p className="text-gray-300 text-center">
                Escolha um dos nossos tokens para representar sua profissão
              </p>
              
              {Object.entries(groupedTokens).map(([category, tokens]) => (
                <div key={category}>
                  <h4 className="text-lg font-cinzel font-semibold text-accent-gold mb-4">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {tokens.map((token) => (
                      <button
                        key={token.id}
                        onClick={() => handleTokenSelect(token)}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          selectedToken === token.id
                            ? 'border-accent-gold bg-accent-gold/10'
                            : 'border-light-purple/20 hover:border-accent-gold/50'
                        }`}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-dark-purple/30">
                          <img
                            src={token.imagePath}
                            alt={token.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-white text-center font-medium">
                          {token.name}
                        </p>
                        
                        {selectedToken === token.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center">
                            <Check size={14} className="text-dark-blue" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview da foto atual */}
        {currentPhotoURL && (
          <div className="mb-6 text-center">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Foto Atual</h4>
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-light-purple/20">
              <img
                src={currentPhotoURL}
                alt="Foto atual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            disabled={!uploadedImage && !selectedToken}
            className={`btn-primary flex-1 ${
              !uploadedImage && !selectedToken ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Salvar Foto
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePhotoSelector;
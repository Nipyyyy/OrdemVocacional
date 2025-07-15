import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationContainer';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../schemas/authSchemas';

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  const { addNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange'
  });

  const watchedEmail = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      await resetPassword(data.email);
      addNotification({
        type: 'success',
        title: 'E-mail Enviado',
        message: 'E-mail de recuperação enviado! Verifique sua caixa de entrada e spam. O link expira em 1 hora.',
        duration: 8000,
      });
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-md px-4">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-cinzel font-bold text-accent-gold mb-2">
              Esqueceu a Senha?
            </h1>
            <p className="text-gray-300">
              Digite seu e-mail para receber um link de recuperação
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                E-mail *
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`input-field w-full pr-10 ${
                    errors.email ? 'border-error' : watchedEmail ? 'border-success' : ''
                  }`}
                  placeholder="seu@email.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`btn-primary w-full flex items-center justify-center ${
                !isValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-blue border-t-transparent rounded-full animate-spin mr-2" />
                  <span className="sr-only">Enviando e-mail...</span>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Enviar Link de Recuperação
                </>
              )}
            </button>

            {/* Informações adicionais */}
            <div className="bg-dark-purple/30 p-4 rounded-lg border border-light-purple/20">
              <h3 className="text-sm font-medium text-accent-gold mb-2">
                Como funciona:
              </h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Você receberá um e-mail com um link seguro</li>
                <li>• O link expira em 1 hora por segurança</li>
                <li>• Verifique também sua pasta de spam</li>
                <li>• Clique no link para criar uma nova senha</li>
              </ul>
            </div>

            {/* Link para voltar */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-accent-gold hover:text-accent-gold/80 transition-colors text-sm focus:outline-none focus:underline"
              >
                <ArrowLeft size={16} className="mr-1" />
                Voltar para o Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
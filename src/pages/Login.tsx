import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationContainer';
import { motion } from 'framer-motion';
import { LogIn, AlertCircle, Eye, EyeOff, Mail } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schemas/authSchemas';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Login realizado com sucesso!',
      });
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Erro no Login',
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await loginWithGoogle();
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Login com Google realizado com sucesso!',
      });
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Erro no Login',
        message: err.message,
      });
    } finally {
      setIsGoogleLoading(false);
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
              Entrar
            </h1>
            <p className="text-gray-300">
              Acesse sua conta para continuar sua jornada
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

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Senha *
                </label>
                <Link 
                  to="/esqueci-senha" 
                  className="text-xs text-accent-gold hover:text-accent-gold/80 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`input-field w-full pr-10 ${
                    errors.password ? 'border-error' : watchedPassword ? 'border-success' : ''
                  }`}
                  placeholder="••••••••"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-error" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`btn-primary w-full flex items-center justify-center ${
                !isValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
              aria-describedby={!isValid ? 'submit-help' : undefined}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-blue border-t-transparent rounded-full animate-spin mr-2" />
                  <span className="sr-only">Fazendo login...</span>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn size={18} className="mr-2" />
                  Entrar
                </>
              )}
            </button>
            
            {!isValid && (
              <p id="submit-help" className="text-xs text-gray-400 text-center">
                Preencha todos os campos corretamente para continuar
              </p>
            )}

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-light-purple/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-blue text-gray-400">ou</span>
              </div>
            </div>

            {/* Login com Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className={`w-full flex items-center justify-center px-4 py-2 border border-light-purple/30 rounded-md bg-white text-gray-900 hover:bg-gray-50 transition-all duration-300 hover-lift ${
                isGoogleLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
              aria-label="Entrar com Google"
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
                  <span className="sr-only">Fazendo login com Google...</span>
                  Entrando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com Google
                </>
              )}
            </button>

            {/* Link para cadastro */}
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Ainda não tem uma conta?{' '}
                <Link 
                  to="/cadastro" 
                  className="text-accent-gold hover:text-accent-gold/80 transition-colors font-medium focus:outline-none focus:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
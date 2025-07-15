import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const requirements = [
    {
      label: 'Pelo menos 8 caracteres',
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      label: 'Uma letra minúscula',
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      label: 'Uma letra maiúscula',
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      label: 'Um número',
      test: (pwd: string) => /\d/.test(pwd),
    },
  ];

  const getStrengthLevel = () => {
    const passedRequirements = requirements.filter(req => req.test(password)).length;
    if (passedRequirements === 0) return { level: 0, label: '', color: '' };
    if (passedRequirements <= 1) return { level: 1, label: 'Muito fraca', color: 'bg-red-500' };
    if (passedRequirements <= 2) return { level: 2, label: 'Fraca', color: 'bg-orange-500' };
    if (passedRequirements <= 3) return { level: 3, label: 'Média', color: 'bg-yellow-500' };
    return { level: 4, label: 'Forte', color: 'bg-green-500' };
  };

  const strength = getStrengthLevel();

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Barra de força */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Força da senha</span>
          <span className="text-xs text-gray-300">{strength.label}</span>
        </div>
        <div className="w-full bg-dark-purple/50 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.level / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Lista de requisitos */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                isPassed ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                {isPassed ? (
                  <Check size={10} className="text-white" />
                ) : (
                  <X size={10} className="text-gray-400" />
                )}
              </div>
              <span className={`text-xs ${
                isPassed ? 'text-green-400' : 'text-gray-400'
              }`}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
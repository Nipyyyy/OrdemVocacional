# 🔧 Configuração Completa do Firebase

## ⚠️ IMPORTANTE: Configurações Obrigatórias

Para resolver o erro "The requested action is invalid" no Google Auth, siga EXATAMENTE estes passos:

## 1. 🔥 Configuração Inicial do Firebase

### Passo 1: Criar Projeto
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `ordem-vocacional` (ou outro nome)
4. **IMPORTANTE**: Anote o Project ID que será gerado

### Passo 2: Configurar Authentication
1. No painel lateral, clique em "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Habilite **Email/Password**
5. Habilite **Google** (veja configuração detalhada abaixo)

## 2. 🔐 Configuração Detalhada do Google Auth

### Passo 1: Configurar OAuth no Google Cloud Console
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione seu projeto Firebase (mesmo nome/ID)
3. Vá para "APIs e serviços" > "Credenciais"
4. Se não existir, clique em "Criar credenciais" > "ID do cliente OAuth 2.0"

### Passo 2: Configurar o Cliente OAuth
1. **Tipo de aplicativo**: Aplicativo da Web
2. **Nome**: Ordem Vocacional Web
3. **Origens JavaScript autorizadas**:
   ```
   http://localhost:5173
   http://localhost:3000
   https://seu-dominio.com (quando em produção)
   ```
4. **URIs de redirecionamento autorizados**:
   ```
   http://localhost:5173
   http://localhost:3000
   https://seu-dominio.com (quando em produção)
   ```

### Passo 3: Configurar no Firebase
1. Volte para Firebase Console > Authentication > Sign-in method
2. Clique em "Google"
3. Habilite o provedor
4. **Project support email**: Seu email
5. Clique em "Salvar"

## 3. 🌐 Configurar Domínios Autorizados

### No Firebase Console:
1. Authentication > Settings > Authorized domains
2. Adicione seus domínios:
   ```
   localhost
   seu-dominio.com (quando em produção)
   ```

## 4. 🗄️ Configurar Firestore

### Passo 1: Criar Database
1. Vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. **Modo**: Iniciar no modo de teste
4. **Localização**: Escolha a mais próxima (ex: southamerica-east1)

### Passo 2: Regras de Segurança (Temporárias para teste)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura/escrita para usuários autenticados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Permite leitura para dados públicos
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 5. ⚙️ Obter Configurações do Projeto

### Passo 1: Registrar App Web
1. No Firebase Console, vá para "Configurações do projeto" (ícone engrenagem)
2. Na seção "Seus aplicativos", clique no ícone `</>`
3. **Nome do app**: Ordem Vocacional
4. **Também configurar o Firebase Hosting**: ❌ (não marque por enquanto)
5. Clique em "Registrar app"

### Passo 2: Copiar Configurações
Você receberá algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "ordem-vocacional-12345.firebaseapp.com",
  projectId: "ordem-vocacional-12345",
  storageBucket: "ordem-vocacional-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## 6. 🔧 Atualizar Código

### Substitua em `src/config/firebase.ts`:
```typescript
const firebaseConfig = {
  // COLE SUAS CONFIGURAÇÕES REAIS AQUI
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 7. 🧪 Testar a Configuração

### Checklist de Verificação:
- [ ] Firebase project criado
- [ ] Authentication habilitado (Email + Google)
- [ ] Google OAuth configurado no Google Cloud Console
- [ ] Domínios autorizados adicionados
- [ ] Firestore Database criado
- [ ] Configurações copiadas para o código
- [ ] App web registrado no Firebase

### Teste Manual:
1. Abra o console do navegador (F12)
2. Tente fazer login com Google
3. Verifique se há erros no console
4. Se der erro, verifique:
   - Se as configurações estão corretas
   - Se os domínios estão autorizados
   - Se o OAuth está configurado

## 8. 🚨 Problemas Comuns e Soluções

### "The requested action is invalid"
- ✅ Verifique se o authDomain está correto (deve terminar com .firebaseapp.com)
- ✅ Confirme se o Google OAuth está habilitado no Firebase
- ✅ Verifique se localhost está nos domínios autorizados
- ✅ Confirme se as origens JavaScript estão configuradas no Google Cloud Console

### "Popup blocked"
- ✅ Permita popups no navegador
- ✅ Teste em modo incógnito
- ✅ Use redirecionamento em mobile (já implementado)

### "Unauthorized domain"
- ✅ Adicione seu domínio em Firebase > Authentication > Settings > Authorized domains
- ✅ Adicione as origens no Google Cloud Console

### "Invalid API key"
- ✅ Verifique se copiou a API key corretamente
- ✅ Confirme se o projeto está ativo no Firebase

## 9. 📱 Configuração para Produção

Quando for para produção:

1. **Adicione seu domínio real** nos domínios autorizados
2. **Configure HTTPS** (obrigatório para OAuth)
3. **Atualize as regras do Firestore** para produção
4. **Configure variáveis de ambiente** para as chaves

## 10. 🔒 Segurança

### Regras de Firestore para Produção:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == userId
        && request.auth.token.email_verified == true;
    }
  }
}
```

---

## 📞 Suporte

Se ainda tiver problemas:

1. **Verifique o console do navegador** para erros específicos
2. **Teste em modo incógnito** para descartar cache
3. **Confirme todas as configurações** seguindo este guia
4. **Verifique se todos os serviços estão habilitados** no Firebase

**Lembre-se**: Nunca commite suas chaves reais no repositório público!
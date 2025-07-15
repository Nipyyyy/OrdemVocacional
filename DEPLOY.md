# 🚀 Deploy no GitHub Pages

## Passos para colocar o site no ar:

### 1. **Criar repositório no GitHub**
1. Acesse [GitHub.com](https://github.com)
2. Clique em "New repository"
3. Nome do repositório: `ordem-vocacional` (ou outro nome de sua escolha)
4. Marque como **Public**
5. Clique em "Create repository"

### 2. **Configurar o projeto localmente**
1. No terminal, dentro da pasta do projeto, execute:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/nome-do-repositorio.git
git push -u origin main
```

### 3. **Atualizar configuração do Vite**
⚠️ **IMPORTANTE**: No arquivo `vite.config.ts`, substitua `/nome-do-seu-repositorio/` pelo nome real do seu repositório.

Exemplo: Se seu repositório se chama `ordem-vocacional`, altere para:
```typescript
base: process.env.NODE_ENV === 'production' ? '/ordem-vocacional/' : '/',
```

### 4. **Ativar GitHub Pages**
1. No seu repositório no GitHub, vá em **Settings**
2. Role para baixo até **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. O workflow já está configurado e será executado automaticamente

### 5. **Fazer deploy**
Sempre que você fizer push para a branch `main`, o site será automaticamente atualizado:
```bash
git add .
git commit -m "Atualização do site"
git push origin main
```

### 6. **Acessar o site**
Após o deploy (leva alguns minutos), seu site estará disponível em:
```
https://SEU-USUARIO.github.io/nome-do-repositorio/
```

## 🔧 Configurações importantes:

### Firebase (OBRIGATÓRIO)
Antes do deploy, você DEVE configurar o Firebase:
1. Edite `src/config/firebase.ts`
2. Substitua as configurações de exemplo pelas suas reais
3. Siga as instruções em `FIREBASE_SETUP.md`

### Domínio personalizado (Opcional)
Se quiser usar um domínio próprio:
1. Crie um arquivo `CNAME` na pasta `public/`
2. Adicione seu domínio (ex: `meusite.com`)
3. Configure o DNS do seu domínio

## 📱 Recursos do site:

✅ **Responsivo** - Funciona em mobile e desktop
✅ **PWA Ready** - Pode ser instalado como app
✅ **SEO Otimizado** - Meta tags configuradas
✅ **Performance** - Otimizado para carregamento rápido
✅ **Seguro** - HTTPS automático via GitHub Pages

## 🐛 Solução de problemas:

### Site não carrega
- Verifique se o `base` no `vite.config.ts` está correto
- Confirme se o GitHub Pages está ativado
- Aguarde alguns minutos após o deploy

### Erro 404 em rotas
- O React Router está configurado para funcionar com GitHub Pages
- Se persistir, verifique a configuração do `basename` nas rotas

### Firebase não funciona
- Confirme se as configurações em `firebase.ts` estão corretas
- Verifique se os domínios estão autorizados no Firebase Console

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do GitHub Actions na aba "Actions"
2. Confirme se todas as dependências estão instaladas
3. Teste localmente com `npm run build && npm run preview`

---

**Seu site estará no ar em poucos minutos! 🎉**
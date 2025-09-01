# 🚀 Guia de Deploy - Azure App Service

Este guia fornece instruções passo a passo para fazer o deploy da aplicação Portal ITV no Azure App Service.

## 📋 Pré-requisitos

- Conta Azure ativa
- Acesso ao Azure Portal
- Aplicação configurada e testada localmente

## 🔧 Passo a Passo do Deploy

### 1. Criar o App Service

1. **Acesse o Azure Portal**
   - Vá para [portal.azure.com](https://portal.azure.com)
   - Faça login com sua conta Azure

2. **Criar Novo Recurso**
   - Clique em "Criar um recurso"
   - Pesquise por "App Service"
   - Selecione "App Service" e clique em "Criar"

3. **Configurar o App Service**
   ```
   Grupo de recursos: [Criar novo ou usar existente]
   Nome: itv-portal-acesso
   Publicar: Código
   Stack de runtime: .NET Core
   Sistema operacional: Windows
   Região: [Escolha a região mais próxima]
   Plano do App Service: [Criar novo ou usar existente]
   ```

4. **Configurar Plano do App Service**
   ```
   Nome: itv-portal-plan
   Sistema operacional: Windows
   Região: [Mesma região do App Service]
   Tipo de preço: B1 (Básico) ou F1 (Gratuito para testes)
   ```

5. **Criar e Implantar**
   - Clique em "Revisar + criar"
   - Aguarde a validação e clique em "Criar"
   - Aguarde a implantação (pode levar alguns minutos)

### 2. Configurar o App Service

1. **Acessar o App Service**
   - Vá para o recurso criado
   - Clique em "Visão geral"

2. **Configurar Configuração Geral**
   - Vá para "Configuração" > "Configurações gerais"
   - Configure:
     ```
     Stack: .NET Core
     Versão: .NET Core 6.0 (LTS)
     Plataforma: Windows
     ```

3. **Configurar Configurações de Aplicação**
   - Vá para "Configuração" > "Configurações da aplicação"
   - Adicione as seguintes variáveis de ambiente:
     ```
     WEBSITE_RUN_FROM_PACKAGE: 1
     WEBSITE_ENABLE_APP_SERVICE_STORAGE: false
     ```

### 3. Fazer Upload dos Arquivos

#### Opção A: Upload via Kudu (Recomendado)

1. **Acessar o Kudu**
   - Vá para "Ferramentas de desenvolvimento" > "Kudu"
   - Clique em "Ir"

2. **Navegar para wwwroot**
   - No Kudu, vá para "Debug Console" > "CMD"
   - Navegue para `site/wwwroot`
   - Delete todos os arquivos existentes

3. **Upload dos Arquivos**
   - Arraste e solte todos os arquivos do projeto para a pasta `wwwroot`
   - Ou use o comando `git clone` se o projeto estiver em um repositório

#### Opção B: Upload via Azure CLI

```bash
# Instalar Azure CLI se não tiver
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Fazer login
az login

# Configurar o grupo de recursos
az webapp deployment source config-zip \
  --resource-group [NOME_DO_GRUPO] \
  --name itv-portal-acesso \
  --src [CAMINHO_PARA_ZIP_DO_PROJETO]
```

#### Opção C: Deploy via GitHub Actions

1. **Criar Workflow do GitHub**
   - Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'itv-portal-acesso'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
```

2. **Configurar Secrets**
   - Vá para Settings > Secrets no GitHub
   - Adicione `AZURE_WEBAPP_PUBLISH_PROFILE` com o perfil de publicação

### 4. Configurar Domínio Personalizado (Opcional)

1. **Adicionar Domínio**
   - Vá para "Configuração" > "Domains"
   - Clique em "Adicionar domínio personalizado"

2. **Configurar DNS**
   - Adicione os registros CNAME ou A conforme necessário
   - Aguarde a propagação do DNS

### 5. Configurar HTTPS

1. **SSL/TLS**
   - Vá para "Configuração" > "SSL/TLS"
   - Configure o certificado SSL

2. **Redirecionamento HTTP para HTTPS**
   - Ative "HTTPS Only"

## 🔍 Verificação do Deploy

### 1. Testar a Aplicação
- Acesse a URL do App Service
- Verifique se a página carrega corretamente
- Teste os links para os dashboards

### 2. Verificar Logs
- Vá para "Monitoramento" > "Log stream"
- Verifique se não há erros

### 3. Testar Responsividade
- Use as ferramentas de desenvolvedor do navegador
- Teste em diferentes tamanhos de tela

## 🚨 Troubleshooting

### Problema: Página não carrega
**Solução:**
- Verifique se todos os arquivos estão em `wwwroot`
- Confirme se o `index.html` está na raiz
- Verifique os logs do App Service

### Problema: CSS não carrega
**Solução:**
- Verifique se a pasta `css/` está presente
- Confirme se o `web.config` está configurado corretamente
- Verifique as configurações de MIME types

### Problema: JavaScript não funciona
**Solução:**
- Verifique se a pasta `js/` está presente
- Confirme se não há erros no console do navegador
- Verifique se o `web.config` permite JavaScript

### Problema: Performance lenta
**Solução:**
- Ative a compressão no `web.config`
- Configure cache adequado
- Use CDN para fontes se necessário

## 📊 Monitoramento

### 1. Application Insights
- Configure o Application Insights para monitoramento
- Monitore métricas de performance
- Configure alertas para erros

### 2. Métricas do App Service
- CPU e memória
- Tempo de resposta
- Taxa de erro

### 3. Logs
- Logs de aplicação
- Logs de servidor web
- Logs de erro

## 🔄 Atualizações

### 1. Deploy de Atualizações
- Use o mesmo método de deploy inicial
- Faça backup antes de atualizações importantes
- Teste em ambiente de staging se possível

### 2. Rollback
- Use o slot de staging para testes
- Configure slots de produção e staging
- Use o swap de slots para rollback rápido

## 📞 Suporte

- **Documentação Azure**: [docs.microsoft.com/azure/app-service](https://docs.microsoft.com/en-us/azure/app-service/)
- **Fórum Azure**: [social.msdn.microsoft.com/Forums/azure](https://social.msdn.microsoft.com/Forums/azure)
- **Suporte ITV**: Entre em contato com a equipe de desenvolvimento

---

**⚠️ Importante**: Sempre teste o deploy em ambiente de desenvolvimento antes de fazer em produção.


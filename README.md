# Portal de Acesso - Instituto Tecnológico Vale (ITV)

Uma aplicação web moderna e leve para servir como homepage institucional do ITV, funcionando como um hub visual para redirecionamento de usuários a dashboards externos do Power BI Embedded.

## 🚀 Características

- **Design Responsivo**: Mobile-first com suporte completo a todos os dispositivos
- **Acessibilidade**: Implementa as melhores práticas de acessibilidade web (WCAG 2.1)
- **Performance**: Código otimizado e leve para carregamento rápido
- **Identidade Visual**: Design institucional baseado nas cores e tipografia do ITV
- **Sem Frameworks**: HTML5, CSS3 e JavaScript vanilla para máxima compatibilidade

## 🎨 Identidade Visual

### Cores Institucionais
- **Azul Principal**: `#003366` (Azul escuro institucional)
- **Azul Médio**: `#004080` (Azul médio)
- **Azul Escuro**: `#002244` (Azul mais escuro)
- **Branco**: `#ffffff`
- **Cinzas**: Escala completa de cinzas para elementos neutros

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Fallbacks**: Sistema de fontes nativas para melhor performance
- **Hierarquia**: Sistema de tamanhos escalonados para consistência

## 📱 Funcionalidades

### Dashboard Cards
- **Dashboard Operacional**: Redireciona para métricas operacionais em tempo real
- **Análises Estratégicas**: Acesso a dados estratégicos e insights

### Acessibilidade
- Navegação por teclado completa
- Skip links para conteúdo principal
- Labels ARIA dinâmicos
- Suporte a leitores de tela
- Contraste otimizado
- Redução de movimento para usuários sensíveis

### Responsividade
- Breakpoints: 480px, 768px, 1200px
- Grid adaptativo para cards
- Tipografia escalável
- Espaçamentos responsivos

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Variáveis CSS, Grid, Flexbox, Media Queries
- **JavaScript ES6+**: Classes, módulos, event handling
- **Fontes**: Google Fonts (Inter)
- **Ícones**: SVG inline para máxima compatibilidade

## 📁 Estrutura do Projeto

```
myapp/
├── index.html          # Página principal
├── css/
│   └── main.css       # Estilos principais
├── js/
│   └── main.js        # Funcionalidades JavaScript
├── assets/
│   ├── logo-itv.svg   # Logo do ITV
│   └── favicon.ico    # Favicon (a ser criado)
└── README.md          # Este arquivo
```

## 🚀 Deploy

### Azure App Service
1. Faça upload de todos os arquivos para o diretório `wwwroot`
2. Configure o `index.html` como página padrão
3. A aplicação estará disponível imediatamente

### Outros Serviços
- **Netlify**: Drag & drop da pasta do projeto
- **Vercel**: Deploy automático via Git
- **GitHub Pages**: Deploy direto do repositório
- **Servidor Local**: Abra o `index.html` em qualquer navegador

## 🔧 Personalização

### URLs dos Dashboards
Edite as URLs no arquivo `index.html`:

```html
<!-- Dashboard Operacional -->
<a href="SUA_URL_AQUI" target="_blank" rel="noopener noreferrer">

<!-- Análises Estratégicas -->
<a href="SUA_URL_AQUI" target="_blank" rel="noopener noreferrer">
```

### Cores e Estilos
Modifique as variáveis CSS no arquivo `css/main.css`:

```css
:root {
    --color-primary: #SUA_COR_PRINCIPAL;
    --color-primary-light: #SUA_COR_CLARA;
    --color-primary-dark: #SUA_COR_ESCURA;
}
```

### Logo
Substitua o arquivo `assets/logo-itv.svg` pelo logo oficial do ITV.

## 📊 Analytics e Tracking

A aplicação inclui sistema básico de tracking para:
- Acesso aos dashboards
- Redirecionamentos
- Interações do usuário

### Integração com Azure Application Insights
Para integrar com Azure Application Insights, adicione o script no `<head>`:

```html
<script>
    var appInsights = window.appInsights || function(config) {
        function r(config) { t[config] = function() { var i = arguments; t.queue.push(function() { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f; y.src = config.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(y); var t = { cookie: u.cookie, log: "", queue: [] }; function s(t) { t["." + config.connectionString.split(";")[1].split("=")[1]] = "true" } var r = u.referrer; while (r) { var i = r.split("/"); var f = i[i.length - 1]; if (f.indexOf(".") > -1) { s(f); break } } s(t); t[l] = function() { t.queue.push(arguments) }; t[a] = function() { t.queue.push(arguments) }; t[v] = function() { t.queue.push(arguments) }; t[h] = function() { t.queue.push(arguments) }; t[c] = function() { t.queue.push(arguments) }; t[l]("Start"); t[l]("Stop"); t[l]("TrackEvent"); t[l]("TrackPageView"); return t;
    }({
        instrumentationKey: "SUA_CHAVE_AQUI"
    });
    window.appInsights = appInsights;
    appInsights.trackPageView();
</script>
```

## ♿ Acessibilidade

### Conformidade
- **WCAG 2.1 AA**: Implementação completa
- **Navegação por Teclado**: Suporte total
- **Leitores de Tela**: Compatível com NVDA, JAWS, VoiceOver
- **Contraste**: Mínimo 4.5:1 para texto normal

### Recursos de Acessibilidade
- Skip links para navegação rápida
- Foco visível e gerenciado
- Labels ARIA descritivos
- Estrutura semântica HTML5
- Suporte a preferências de usuário

## 🌐 Compatibilidade

### Navegadores Suportados
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Internet Explorer**: 11+ (com limitações)

### Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS 12+, Android 8+
- **Tablet**: iPadOS, Android Tablet

## 📈 Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações Implementadas
- CSS e JavaScript minificados
- Fontes otimizadas com preload
- Imagens SVG inline
- Lazy loading para elementos não críticos
- Debounce em eventos de scroll/resize

## 🔒 Segurança

- Links externos com `rel="noopener noreferrer"`
- Sanitização de inputs (se aplicável)
- Headers de segurança recomendados para produção
- Validação de URLs de redirecionamento

## 📝 Licença

Este projeto foi desenvolvido para o Instituto Tecnológico Vale (ITV).

## 🤝 Contribuição

Para contribuições ou suporte técnico, entre em contato com a equipe de desenvolvimento do ITV.

## 📞 Suporte

- **Email**: suporte@itv.org.br
- **Documentação**: [Link para documentação interna]
- **Issues**: [Link para sistema de tickets]

---

**Desenvolvido com ❤️ para o Instituto Tecnológico Vale**


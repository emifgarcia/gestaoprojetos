/**
 * Portal de Acesso - Instituto Tecnológico Vale
 * JavaScript Principal com Funcionalidades de Acessibilidade
 * 
 * @author Instituto Tecnológico Vale
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Configurações globais
     */
    const CONFIG = {
        // Seletores CSS
        selectors: {
            skipLink: '.skip-link',
            dashboardCards: '.dashboard-card',
            dashboardLinks: '.dashboard-card__link',
            header: '.header',
            main: '.main'
        },
        
        // Classes CSS
        classes: {
            focused: 'is-focused',
            loading: 'is-loading'
        },
        
        // Tempo de transição para animações
        transitionDuration: 250
    };

    /**
     * Classe principal da aplicação
     */
    class ITVPortal {
        constructor() {
            this.isInitialized = false;
            this.init();
        }

        /**
         * Inicializa a aplicação
         */
        init() {
            if (this.isInitialized) return;
            
            try {
                this.setupEventListeners();
                this.setupAccessibility();
                this.setupAnalytics();
                this.isInitialized = true;
                
                console.log('Portal ITV inicializado com sucesso');
            } catch (error) {
                console.error('Erro ao inicializar o Portal ITV:', error);
            }
        }

        /**
         * Configura os event listeners
         */
        setupEventListeners() {
            // Event listener para o skip link
            const skipLink = document.querySelector(CONFIG.selectors.skipLink);
            if (skipLink) {
                skipLink.addEventListener('click', this.handleSkipLink.bind(this));
            }

            // Event listeners para os cards de dashboard
            const dashboardCards = document.querySelectorAll(CONFIG.selectors.dashboardCards);
            dashboardCards.forEach(card => {
                card.addEventListener('click', this.handleCardClick.bind(this));
                card.addEventListener('keydown', this.handleCardKeydown.bind(this));
            });

            // Event listeners para os links de dashboard
            const dashboardLinks = document.querySelectorAll(CONFIG.selectors.dashboardLinks);
            dashboardLinks.forEach(link => {
                link.addEventListener('click', this.handleDashboardLinkClick.bind(this));
                link.addEventListener('focus', this.handleLinkFocus.bind(this));
                link.addEventListener('blur', this.handleLinkBlur.bind(this));
            });

            // Event listener para mudanças de viewport
            window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
            
            // Event listener para scroll
            window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 100));
        }

        /**
         * Configura funcionalidades de acessibilidade
         */
        setupAccessibility() {
            // Adiciona suporte a navegação por teclado
            document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
            
            // Configura ARIA labels dinâmicos
            this.setupARIALabels();
            
            // Configura foco visível
            this.setupFocusManagement();
        }

        /**
         * Configura analytics básico
         */
        setupAnalytics() {
            // Rastreamento de cliques nos dashboards
            const dashboardLinks = document.querySelectorAll(CONFIG.selectors.dashboardLinks);
            dashboardLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.trackEvent('dashboard_access', {
                        dashboard: link.getAttribute('aria-label') || 'unknown',
                        url: link.href
                    });
                });
            });
        }

        /**
         * Manipula o clique no skip link
         */
        handleSkipLink(event) {
            event.preventDefault();
            const target = document.querySelector(event.target.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }

        /**
         * Manipula o clique nos cards de dashboard
         */
        handleCardClick(event) {
            const card = event.currentTarget;
            const link = card.querySelector(CONFIG.selectors.dashboardLinks);
            
            if (link && !event.target.closest(CONFIG.selectors.dashboardLinks)) {
                // Se clicou no card mas não no link, foca no link
                link.focus();
            }
        }

        /**
         * Manipula navegação por teclado nos cards
         */
        handleCardKeydown(event) {
            const card = event.currentTarget;
            const link = card.querySelector(CONFIG.selectors.dashboardLinks);
            
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (link) {
                    link.click();
                }
            }
        }

        /**
         * Manipula o clique nos links de dashboard
         */
        handleDashboardLinkClick(event) {
            const link = event.currentTarget;
            const url = link.href;
            
            // Adiciona classe de loading
            link.classList.add(CONFIG.classes.loading);
            
            // Rastreia o acesso
            this.trackEvent('dashboard_redirect', {
                url: url,
                timestamp: new Date().toISOString()
            });
            
            // Remove classe de loading após um delay
            setTimeout(() => {
                link.classList.remove(CONFIG.classes.loading);
            }, CONFIG.transitionDuration);
        }

        /**
         * Manipula o foco nos links
         */
        handleLinkFocus(event) {
            const link = event.currentTarget;
            link.classList.add(CONFIG.classes.focused);
        }

        /**
         * Manipula a perda de foco nos links
         */
        handleLinkBlur(event) {
            const link = event.currentTarget;
            link.classList.remove(CONFIG.classes.focused);
        }

        /**
         * Manipula navegação global por teclado
         */
        handleGlobalKeydown(event) {
            // Suporte a navegação por teclado
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        }

        /**
         * Manipula mudanças de viewport
         */
        handleResize() {
            // Recalcula posições e tamanhos se necessário
            this.updateLayout();
        }

        /**
         * Manipula scroll da página
         */
        handleScroll() {
            // Adiciona efeito de parallax sutil no header
            this.handleHeaderParallax();
        }

        /**
         * Atualiza o layout da aplicação
         */
        updateLayout() {
            // Implementar lógica de atualização de layout se necessário
        }

        /**
         * Aplica efeito parallax sutil no header
         */
        handleHeaderParallax() {
            const header = document.querySelector(CONFIG.selectors.header);
            if (header) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                header.style.transform = `translateY(${rate}px)`;
            }
        }

        /**
         * Configura labels ARIA dinâmicos
         */
        setupARIALabels() {
            const dashboardCards = document.querySelectorAll(CONFIG.selectors.dashboardCards);
            dashboardCards.forEach((card, index) => {
                const title = card.querySelector('.dashboard-card__title');
                const link = card.querySelector(CONFIG.selectors.dashboardLinks);
                
                if (title && link) {
                    const cardTitle = title.textContent;
                    link.setAttribute('aria-label', `Abrir ${cardTitle} em nova aba`);
                    card.setAttribute('aria-labelledby', `dashboard-title-${index}`);
                    title.id = `dashboard-title-${index}`;
                }
            });
        }

        /**
         * Configura gerenciamento de foco
         */
        setupFocusManagement() {
            // Adiciona suporte a focus visible
            if (CSS.supports('selector(:focus-visible)')) {
                document.body.classList.add('focus-visible-supported');
            }
        }

        /**
         * Rastreia eventos para analytics
         */
        trackEvent(eventName, data = {}) {
            // Implementação básica de tracking
            console.log(`Evento: ${eventName}`, data);
            
            // Aqui você pode integrar com Google Analytics, Azure Application Insights, etc.
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, data);
            }
        }

        /**
         * Função utilitária para debounce
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    }

    /**
     * Função utilitária para verificar se o elemento está visível
     */
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Função utilitária para adicionar classe CSS
     */
    function addClass(element, className) {
        if (element && element.classList) {
            element.classList.add(className);
        }
    }

    /**
     * Função utilitária para remover classe CSS
     */
    function removeClass(element, className) {
        if (element && element.classList) {
            element.classList.remove(className);
        }
    }

    /**
     * Função utilitária para verificar se o dispositivo é mobile
     */
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    /**
     * Função utilitária para verificar se o usuário prefere movimento reduzido
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Inicializa a aplicação quando o DOM estiver pronto
     */
    function initApp() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new ITVPortal();
            });
        } else {
            new ITVPortal();
        }
    }

    /**
     * Inicializa a aplicação
     */
    initApp();

    // Exporta para uso global se necessário
    window.ITVPortal = ITVPortal;

})();


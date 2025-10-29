        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const sections = document.querySelectorAll('main section:not(#logo-banner)');
            
            const staticForm = document.getElementById('contact-static-form');
            const staticMessageBox = document.getElementById('static-message-box');
            
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenu.style.display === 'flex';
                mobileMenu.style.display = isExpanded ? 'none' : 'flex';
                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            });
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.style.display = 'none';
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                });
            });

            staticForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                staticMessageBox.classList.remove('hidden');

                staticForm.querySelector('button').disabled = true;
                staticForm.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
                
                setTimeout(() => {
                    staticForm.querySelector('button').disabled = false;
                    staticForm.querySelectorAll('input, select, textarea').forEach(el => el.disabled = false);
                    staticMessageBox.classList.add('hidden');
                    staticForm.reset(); 
                }, 5000);
            });
            
            const revealObserverOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        target.classList.add('active');
                        
                        if (target.classList.contains('card-grid')) {
                            target.querySelectorAll('.service-card, .usp-card, .guarantee-card').forEach((card, index) => {
                                card.style.transitionDelay = `${index * 0.1}s`;
                                card.classList.add('active');
                            });
                        }
                        
                        observer.unobserve(target);
                    }
                });
            }, revealObserverOptions);
            
            document.querySelectorAll('.reveal').forEach(element => {
                revealObserver.observe(element);
            });

            const headerHeight = 60; 
            const navObserverOptions = {
                root: null,
                rootMargin: `-${headerHeight + 5}px 0px -90% 0px`, 
                threshold: 0 
            };
            
            let currentActiveId = 'home'; 

            const setActiveLink = (id) => {
                if (currentActiveId === id) return;
                
                document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                    link.classList.remove('active');
                });

                const targetLink = document.querySelector(`.nav-links a[href="#${id}"]`); 
                const mobileTargetLink = document.querySelector(`#mobile-menu a[href="#${id}"]`); 
                
                if (targetLink) {
                    targetLink.classList.add('active');
                }
                if (mobileTargetLink) {
                    mobileTargetLink.classList.add('active');
                }

                currentActiveId = id; 
            };
            
            setActiveLink(currentActiveId); 

            const navObserver = new IntersectionObserver((entries) => {
                let activeId = 'home'; 
                
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeId = entry.target.getAttribute('id');
                    }
                });

                if (window.scrollY < 50) {
                    activeId = 'home';
                }

                setActiveLink(activeId);
            }, navObserverOptions);
            
            sections.forEach(section => {
                navObserver.observe(section);
            });
        });

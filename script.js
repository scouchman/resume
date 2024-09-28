document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Function to scroll to element
    function scrollToElement(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - offset;
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }

    // Animate skill bars and handle click events
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('skills');

    skillItems.forEach(item => {
        const skillLevel = item.getAttribute('data-skill');
        const skillProgress = item.querySelector('.skill-progress');
        const skillHeader = item.querySelector('.skill-header');

        // Set initial width
        skillProgress.style.width = `${skillLevel}%`;

        // Ensure skill name is visible
        const skillName = item.querySelector('.skill-name');
        if (parseInt(skillLevel) < 30) {
            skillName.style.color = 'var(--secondary-color)';
        }

        skillHeader.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Close all other active items
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');

            if (!wasActive) {
                // If opening, scroll to the item
                setTimeout(() => {
                    scrollToElement(item, 20); // 20px offset from top
                }, 300); // Delay to allow for expansion animation
            } else {
                // If closing, scroll back to skills section
                setTimeout(() => {
                    scrollToElement(skillsSection, 20);
                }, 300);
            }
        });
    });


    closeSkillButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const skillDescriptionContainer = e.target.closest('.skill-description-container');
            const skillItem = skillDescriptionContainer.closest('.skill-item');
            skillItem.classList.remove('active');
            skillDescriptionContainer.classList.remove('active');
            activeSkillItem = null;
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Update copyright year
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();
});

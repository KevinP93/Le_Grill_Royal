// Menu data
const menuItems = [
    {
        category: "Entrées",
        items: [
            { name: "Tartare de bœuf", description: "Bœuf charolais, câpres, cornichons, oignons rouges, jaune d'œuf", price: "18€" },
            { name: "Foie gras maison", description: "Mi-cuit, chutney de figues, pain brioché toasté", price: "22€" },
            { name: "Carpaccio de Saint-Jacques", description: "Saint-Jacques fraîches, huile d'olive au citron, fleur de sel", price: "24€" }
        ]
    },
    {
        category: "Viandes",
        items: [
            { name: "Côte de bœuf", description: "AOP Charolaise 600g, sauce au choix, frites maison", price: "48€" },
            { name: "Filet de Black Angus", description: "250g, sauce béarnaise, gratin dauphinois", price: "42€" },
            { name: "Carré d'agneau", description: "Rôti à la provençale, légumes de saison", price: "38€" },
            { name: "Pavé de wagyu", description: "180g, purée truffée, champignons sautés", price: "65€" }
        ]
    },
    {
        category: "Chichas",
        items: [
            { name: "Classique", description: "Double pomme, menthe, raisin", price: "18€" },
            { name: "Exotique", description: "Mangue, passion, coco", price: "20€" },
            { name: "Signature", description: "Mélange exclusif du chef", price: "22€" },
            { name: "Premium", description: "Tabac brun égyptien, fruits frais", price: "25€" }
        ]
    }
];

// Generate menu items
document.addEventListener('DOMContentLoaded', function () {
    const menuContainer = document.querySelector('#menu .grid');

    menuItems.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in';
        categoryElement.innerHTML = `
            <div class="bg-primary text-white p-4">
                <h3 class="text-xl font-bold">${category.category}</h3>
            </div>
            <div class="p-6 space-y-6">
                ${category.items.map(item => `
                    <div class="menu-item group">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-bold text-lg group-hover:text-primary transition-colors">${item.name}</h4>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">${item.description}</p>
                            </div>
                            <span class="font-bold text-secondary">${item.price}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        menuContainer.appendChild(categoryElement);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                document.getElementById('mobile-menu').classList.add('hidden');
            }
        });
    });

    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    function toggleTheme() {
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);


    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gallery modal
    const galleryImages = document.querySelectorAll('#galerie img');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modal.classList.remove('invisible', 'opacity-0');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function () {
        modal.classList.add('opacity-0', 'invisible');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.add('opacity-0', 'invisible');
            document.body.style.overflow = 'auto';
        }
    });

    document.getElementById('reservation-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Merci pour votre réservation! Nous vous contacterons pour confirmation.');
        this.reset();
    });

    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.animate-fade-in').forEach(el => {
        el.style.opacity = '0';
    });

    document.querySelectorAll('.animate-slide-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
});

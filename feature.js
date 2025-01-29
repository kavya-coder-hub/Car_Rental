// Feature data
const features = [
    {
        icon: 'car',
        title: 'Wide Selection',
        description: 'Choose from our extensive fleet of premium vehicles for any occasion'
    },
    {
        icon: 'shield-check',
        title: 'Safe & Secure',
        description: 'All our vehicles are regularly maintained and fully insured'
    },
    {
        icon: 'clock-3',
        title: '24/7 Support',
        description: 'Round-the-clock customer service to assist you anytime'
    },
    {
        icon: 'map-pin',
        title: 'Flexible Pickup',
        description: 'Multiple pickup locations across the city for your convenience'
    },
    {
        icon: 'credit-card',
        title: 'Easy Payment',
        description: 'Secure and flexible payment options for hassle-free booking'
    },
    {
        icon: 'star',
        title: 'Best Prices',
        description: 'Competitive rates and special offers for our loyal customers'
    }
];

function createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'feature-card';
    
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'icon-wrapper';

    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', feature.icon);
    iconWrapper.appendChild(icon);
    
    card.innerHTML = `
        ${iconWrapper.outerHTML}
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
    `;
    
    return card;
}

// Populate features grid
document.addEventListener('DOMContentLoaded', () => {
    const featuresGrid = document.getElementById('features-grid');
    features.forEach(feature => {
        featuresGrid.appendChild(createFeatureCard(feature));
    });
    
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Add smooth scroll behavior for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            if (target) {
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
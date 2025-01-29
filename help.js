// Initialize Lucide icons
lucide.createIcons();

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    // Toggle the clicked item
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question span').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
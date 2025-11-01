// Global state management
const appState = {
  currentTheme: 'light',
  currentSection: 'home',
  mobileMenuOpen: false
};

// Initialize the application
$(document).ready(function() {
  initializeTheme();
  initializeNavigation();
  initializeMobileMenu();
  initializeScrollTop();
  initializeContactForm();
  initializeDownloadCV();
  initializeProjectFilters();
  initializeSmoothScroll();
});

// Theme Toggle Functionality
function initializeTheme() {
  const savedTheme = appState.currentTheme;
  if (savedTheme === 'dark') {
    $('body').attr('data-theme', 'dark');
    $('#themeToggle i').removeClass('fa-moon').addClass('fa-sun');
  }

  $('#themeToggle').on('click', function() {
    const currentTheme = $('body').attr('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    $('body').attr('data-theme', newTheme);
    appState.currentTheme = newTheme;
    
    if (newTheme === 'dark') {
      $(this).find('i').removeClass('fa-moon').addClass('fa-sun');
    } else {
      $(this).find('i').removeClass('fa-sun').addClass('fa-moon');
    }
  });
}

// Navigation Functionality
function initializeNavigation() {
  $('.nav-link').on('click', function(e) {
    e.preventDefault();
    const targetSection = $(this).attr('href').substring(1);
    
    // Update active states
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    
    // Hide all sections and show target section
    $('.section').removeClass('active');
    $('#' + targetSection).addClass('active');
    
    // Update state
    appState.currentSection = targetSection;
    
    // Close mobile menu if open
    if (appState.mobileMenuOpen) {
      $('#navMenu').removeClass('active');
      $('#hamburger').removeClass('active');
      appState.mobileMenuOpen = false;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Footer links
  $('.footer-links a').on('click', function(e) {
    e.preventDefault();
    const targetSection = $(this).attr('href').substring(1);
    
    // Trigger the corresponding nav link
    $('.nav-link[href="#' + targetSection + '"]').trigger('click');
  });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  $('#hamburger').on('click', function() {
    $(this).toggleClass('active');
    $('#navMenu').toggleClass('active');
    appState.mobileMenuOpen = !appState.mobileMenuOpen;
  });
}

// Scroll to Top Button
function initializeScrollTop() {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      $('#scrollTop').addClass('show');
    } else {
      $('#scrollTop').removeClass('show');
    }
  });
  
  $('#scrollTop').on('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact Form Validation and Submission
function initializeContactForm() {
  const form = $('#contactForm');
  const inputs = form.find('input, textarea');
  
  // Real-time validation
  inputs.on('blur', function() {
    validateField($(this));
  });
  
  // Form submission
  form.on('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    inputs.each(function() {
      if (!validateField($(this))) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Simulate form submission
      const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
      };
      
      console.log('Form submitted:', formData);
      
      // Show success message
      $('#successMessage').addClass('show');
      
      // Reset form
      form[0].reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        $('#successMessage').removeClass('show');
      }, 5000);
    }
  });
}

function validateField(field) {
  const fieldId = field.attr('id');
  const value = field.val().trim();
  const errorElement = $('#' + fieldId + 'Error');
  
  // Clear previous errors
  field.removeClass('error');
  errorElement.removeClass('show').text('');
  
  // Validate based on field type
  if (value === '') {
    showError(field, errorElement, 'This field is required');
    return false;
  }
  
  if (fieldId === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(field, errorElement, 'Please enter a valid email address');
      return false;
    }
  }
  
  if (fieldId === 'name' && value.length < 2) {
    showError(field, errorElement, 'Name must be at least 2 characters');
    return false;
  }
  
  if (fieldId === 'subject' && value.length < 3) {
    showError(field, errorElement, 'Subject must be at least 3 characters');
    return false;
  }
  
  if (fieldId === 'message' && value.length < 10) {
    showError(field, errorElement, 'Message must be at least 10 characters');
    return false;
  }
  
  return true;
}

function showError(field, errorElement, message) {
  field.addClass('error');
  errorElement.text(message).addClass('show');
}

// Download CV Functionality
function initializeDownloadCV() {
  $('#downloadCV').on('click', function() {
    // Create a print-friendly version
    const originalTitle = document.title;
    document.title = 'Prince_Kumar_jha_Resume';
    
    // Trigger print dialog
    window.print();
    
    // Restore original title
    setTimeout(function() {
      document.title = originalTitle;
    }, 100);
    
    // Alternative: You could also generate a PDF here using a library like jsPDF
    console.log('CV download initiated');
  });
}

// Project Filters
function initializeProjectFilters() {
  $('.filter-btn').on('click', function() {
    const filter = $(this).data('filter');
    
    // Update active button
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    // Filter projects
    if (filter === 'all') {
      $('.project-card').removeClass('hidden').fadeIn(400);
    } else {
      $('.project-card').each(function() {
        const categories = $(this).data('category').split(' ');
        if (categories.includes(filter)) {
          $(this).removeClass('hidden').fadeIn(400);
        } else {
          $(this).addClass('hidden').fadeOut(400);
        }
      });
    }
  });
}

// Smooth Scroll for Home Buttons
function initializeSmoothScroll() {
  $('.home-buttons a').on('click', function(e) {
    e.preventDefault();
    const targetSection = $(this).attr('href').substring(1);
    
    // Trigger navigation
    $('.nav-link[href="#' + targetSection + '"]').trigger('click');
  });
}

// Add keyboard navigation support
$(document).on('keydown', function(e) {
  // ESC key to close mobile menu
  if (e.key === 'Escape' && appState.mobileMenuOpen) {
    $('#hamburger').trigger('click');
  }
  
  // Tab navigation enhancement
  if (e.key === 'Tab') {
    // Add visible focus states
    $('*:focus').css('outline', '2px solid var(--primary-color)');
  }
});

// Handle window resize
$(window).on('resize', function() {
  // Close mobile menu on desktop view
  if ($(window).width() > 968 && appState.mobileMenuOpen) {
    $('#navMenu').removeClass('active');
    $('#hamburger').removeClass('active');
    appState.mobileMenuOpen = false;
  }
});

// Add animation on scroll for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards and elements
$(document).ready(function() {
  $('.biodata-card, .project-card, .experience-item').each(function() {
    this.style.opacity = '0';
    this.style.transform = 'translateY(20px)';
    this.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(this);
  });
});
// ========================================
// 7SMARTS INDONESIA - MOBILE RESPONSIVE SCRIPT
// Handles mobile menu toggle and dropdown functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  
  // Create mobile menu toggle button
  const navbar = document.querySelector('.container-navbar');
  const navbarMenu = document.querySelector('.navbar');
  
  // Check if menu toggle already exists, if not create it
  let menuToggle = document.querySelector('.menu-toggle');
  
  if (!menuToggle) {
    menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Insert before navbar
    navbar.insertBefore(menuToggle, navbarMenu);
  }
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // ========================================
  // MOBILE DROPDOWN FUNCTIONALITY
  // ========================================
  
  // Handle dropdown clicks on mobile
  const navItems = document.querySelectorAll('.navbar > li');
  
  navItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');
    
    if (dropdown) {
      // Clone the link to remove existing event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add click event for mobile dropdown
      newLink.addEventListener('click', function(e) {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          
          // Close other dropdowns
          navItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          item.classList.toggle('active');
        }
      });
    }
  });
  
  // ========================================
  // CLOSE MENU ON OUTSIDE CLICK
  // ========================================
  
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navbarMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  // ========================================
  // CLOSE MENU ON LINK CLICK (NON-DROPDOWN LINKS)
  // ========================================
  
  const navLinks = document.querySelectorAll('.navbar > li > a');
  
  navLinks.forEach(link => {
    // Only close menu if it's not a dropdown parent
    const parentLi = link.parentElement;
    const hasDropdown = parentLi.querySelector('.dropdown');
    
    if (!hasDropdown) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove('active');
          navbarMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  });
  
  // Also close menu when clicking dropdown items
  const dropdownLinks = document.querySelectorAll('.dropdown a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Close all dropdowns
        navItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    });
  });
  
  // ========================================
  // HANDLE WINDOW RESIZE
  // ========================================
  
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile menu if window is resized to desktop
      if (window.innerWidth > 768) {
        menuToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Remove active class from all nav items
        navItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    }, 250);
  });
  
  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove('active');
          navbarMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        // Calculate offset for fixed navbar
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  // ========================================
  
  const style = document.createElement('style');
  style.textContent = `
    body.menu-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
  
  // ========================================
  // ADD SCROLL SHADOW TO NAVBAR
  // ========================================
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
  
});

// ========================================
// LAZY LOADING IMAGES (OPTIONAL PERFORMANCE BOOST)
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  // Observe all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// LOG SCRIPT LOADED
// ========================================

console.log('7Smarts Indonesia - Mobile Responsive Script Loaded ✓');

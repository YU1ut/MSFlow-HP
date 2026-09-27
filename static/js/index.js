window.HELP_IMPROVE_VIDEOJS = false;

document.addEventListener('DOMContentLoaded', function() {
  var carouselOptions = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000
  };

  if (window.bulmaCarousel) {
    bulmaCarousel.attach('.carousel', carouselOptions);
  }

  if (window.bulmaSlider) {
    bulmaSlider.attach();
  }

  var sidebar = document.getElementById('sidebar');
  var sidebarItems = document.querySelectorAll('.sidebar-item');
  var sections = ['abstract', 'method', 'text-to-motion', 'representation-comparison', 'snapmogen', 'motion-control'];
  var body = document.body;

  if (!sidebar || sidebarItems.length === 0) {
    return;
  }

  function updateActiveSidebarItem() {
    var scrollPos = window.scrollY + 150;
    var activeIndex = 0;

    for (var i = 0; i < sections.length; i++) {
      var section = document.getElementById(sections[i]);
      if (!section) {
        continue;
      }

      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        activeIndex = i;
        break;
      }

      if (scrollPos < sectionTop) {
        break;
      }

      activeIndex = i;
    }

    sidebarItems.forEach(function(item) {
      item.classList.remove('active');
    });

    if (sidebarItems[activeIndex]) {
      sidebarItems[activeIndex].classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveSidebarItem);
  updateActiveSidebarItem();

  sidebarItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      var targetId = item.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);

      if (!targetSection) {
        return;
      }

      sidebarItems.forEach(function(sidebarItem) {
        sidebarItem.classList.remove('active');
      });
      item.classList.add('active');

      window.scrollTo({
        top: targetSection.offsetTop - 20,
        behavior: 'smooth'
      });

      if (window.innerWidth < 1024) {
        sidebar.classList.remove('mobile-open');
        updateSidebarToggleState();
      }
    });
  });

  var sidebarToggleButton = document.createElement('button');
  sidebarToggleButton.className = 'sidebar-toggle';
  sidebarToggleButton.setAttribute('aria-label', 'Hide navigation');
  sidebarToggleButton.setAttribute('aria-expanded', 'true');
  document.body.appendChild(sidebarToggleButton);

  function updateSidebarToggleState() {
    var isMobile = window.innerWidth < 1024;

    if (!isMobile) {
      sidebar.classList.remove('mobile-open');
    }

    var isHidden = isMobile ? !sidebar.classList.contains('mobile-open') : body.classList.contains('sidebar-hidden');
    sidebarToggleButton.textContent = isHidden ? '\u2630' : '\u00d7';
    sidebarToggleButton.setAttribute('aria-label', isHidden ? 'Show navigation' : 'Hide navigation');
    sidebarToggleButton.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
  }

  sidebarToggleButton.addEventListener('click', function(event) {
    event.stopPropagation();

    if (window.innerWidth < 1024) {
      sidebar.classList.toggle('mobile-open');
    } else {
      body.classList.toggle('sidebar-hidden');
    }

    updateSidebarToggleState();
  });

  window.addEventListener('resize', updateSidebarToggleState);

  document.addEventListener('click', function(event) {
    if (window.innerWidth >= 1024) {
      return;
    }

    if (!sidebar.contains(event.target) && !sidebarToggleButton.contains(event.target)) {
      sidebar.classList.remove('mobile-open');
      updateSidebarToggleState();
    }
  });

  updateSidebarToggleState();
});

const header = document.querySelector('[data-header]'); const nav = document.querySelector('[data-nav]'); const toggle = document.querySelector('[data-nav-toggle]'); window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20)); toggle?.addEventListener('click', () => nav.classList.toggle('open')); document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open'))); const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: .12 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const searchInput = document.querySelector("#globalSearch");
const resultsContainer = document.querySelector(".search-results");

if (searchInput) {

  const searchableContent = [

    ...Array.from(document.querySelectorAll("[data-search-item]"))

  ].map(item => ({
      title: item.dataset.title,
      category: item.dataset.category,
      url: item.dataset.url
  }));

  searchInput.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    resultsContainer.innerHTML = "";

    if (value.length < 2) {
      resultsContainer.classList.remove("active");
      return;
    }

    const filtered = searchableContent.filter(item =>
      item.title.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value)
    );

    resultsContainer.classList.add("active");

    if (!filtered.length) {

      resultsContainer.innerHTML = `
        <div class="search-empty">
          Nenhum conteúdo encontrado.
        </div>
      `;

      return;
    }

    filtered.forEach(item => {

      resultsContainer.innerHTML += `
        <a class="search-result-item" href="${item.url}">
          <span>${item.category}</span>
          <strong>${item.title}</strong>
        </a>
      `;

    });

  });

}

/* =============================
   READING PROGRESS BAR
============================= */

const readingBar = document.querySelector("#readingProgressBar");

if (readingBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    readingBar.style.width = `${progress}%`;
  });
}
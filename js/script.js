"use strict";

/* UTILITÁRIOS */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* DETECÇÃO DE PÁGINA */
function getPage() {
  if (document.getElementById("featured-products"))  return "home";
  if (document.getElementById("products-container")) return "produtos";
  if (document.getElementById("cadastro-form"))      return "cadastro";
  return "outro";
}

/* Para adicionar imagem: troque a linha  emoji por  img: "img/nome-do-arquivo.jpg" */
const PRODUCTS = [

  // NOTEBOOKS
  {
    id: 1,
    name: "Notebook Acer Nitro 5 AN515",
    category: "notebooks",
    price: 4800,
    oldPrice: 5700,
    badge: "Oferta",
    emoji: "💻",         // img: "img/notebook-1.jpg"
    desc: "Notebook gamer com placa de vídeo dedicada, tela 144Hz e desempenho sólido.",
    specs: ["Intel Core i5-12500H", "8 GB RAM DDR4", "SSD 512 GB NVMe", "RTX 3050 4 GB", "15.6 Full HD 144Hz"]
  },
  {
    id: 2,
    name: "Notebook Dell Inspiron 15 3520",
    category: "notebooks",
    price: 3200,
    emoji: "💻",         // img: "img/notebook-2.jpg"
    desc: "Notebook para trabalho e estudo com processador Intel de 12a geracao e Windows 11.",
    specs: ["Intel Core i5-1235U", "8 GB RAM DDR4", "SSD 256 GB", "15.6 Full HD", "Windows 11 Home"]
  },
  {
    id: 3,
    name: "Notebook Gamer Asus TUF F15",
    category: "notebooks",
    price: 6000,
    oldPrice: 7300,
    badge: "18% OFF",
    emoji: "💻",         // img: "img/notebook-3.jpg"
    desc: "Estrutura militar MIL-STD-810H e performance gamer de verdade.",
    specs: ["Intel Core i5-12500H", "8 GB RAM DDR5", "SSD 512 GB NVMe", "RTX 3050 4 GB", "15.6 144Hz IPS"]
  },

  // MONITORES
  {
    id: 4,
    name: "Monitor LG 24 Full HD IPS 75Hz",
    category: "monitores",
    price: 849,
    emoji: "🖥️",        // img: "img/monitor-1.jpg"
    desc: "Monitor IPS com cores precisas e 75Hz. Otimo para trabalho, estudo e games casuais.",
    specs: ["24 Full HD 1920x1080", "Painel IPS", "75Hz / 1ms MBR", "HDMI + VGA", "AMD FreeSync"]
  },
  {
    id: 5,
    name: "Monitor Samsung 27 Curvo 165Hz",
    category: "monitores",
    price: 1349,
    oldPrice: 1699,
    badge: "Oferta",
    emoji: "🖥️",        // img: "img/monitor-2.jpg"
    desc: "Monitor curvo WQHD com 165Hz para imersao total nos jogos.",
    specs: ["27 WQHD 2560x1440", "Painel VA Curvo 1000R", "165Hz / 1ms", "DisplayPort + HDMI", "HDR10"]
  },

  // PERIFERICOS
  {
    id: 6,
    name: "Mouse Logitech G203 LIGHTSYNC",
    category: "perifericos",
    price: 189,
    emoji: "🖱️",        // img: "img/mouse-1.jpg"
    desc: "Mouse gamer leve com sensor optico de 8000 DPI e iluminacao RGB.",
    specs: ["8000 DPI", "6 botoes programaveis", "RGB LIGHTSYNC", "Cabo USB 2.1m", "Peso 85g"]
  },
  {
    id: 7,
    name: "Teclado Mecanico Redragon Kumara K552",
    category: "perifericos",
    price: 200,
    badge: "Popular",
    emoji: "⌨️",        // img: "img/teclado-1.jpg"
    desc: "Teclado mecanico TKL com switch Red linear e retroiluminacao RGB.",
    specs: ["Switch Outemu Red", "RGB por tecla", "ABNT2 TKL", "Anti-ghosting N-Key", "Estrutura metalica"]
  },
  {
    id: 8,
    name: "Headset HyperX Cloud Stinger 2",
    category: "perifericos",
    price: 250,
    emoji: "🎧",        // img: "img/headset-1.jpg"
    desc: "Headset leve com drivers de 40mm e som surround DTS Spatial Audio.",
    specs: ["Drivers 40mm", "DTS Spatial Audio", "Microfone flip-to-mute", "Conector 3.5mm + USB", "Peso 275g"]
  },

  // COMPONENTES
  {
    id: 9,
    name: "Placa de Video Asus RTX 4060 8GB",
    category: "componentes",
    price: 2500,
    oldPrice: 3000,
    badge: "Oferta",
    emoji: "🎮",        // img: "img/gpu-1.jpg"
    desc: "RTX 4060 com DLSS 3 e Ray Tracing de ultima geracao. Ideal para 1080p maximo.",
    specs: ["8 GB GDDR6", "DLSS 3 + Frame Generation", "Ray Tracing", "2x HDMI + 3x DisplayPort", "TDP 115W"]
  },
  {
    id: 10,
    name: "Processador AMD Ryzen 5 5600G",
    category: "componentes",
    price: 600,
    emoji: "⚙️",        // img: "img/cpu-1.jpg"
    desc: "Processador com graficos integrados Radeon Vega. Otimo custo-beneficio.",
    specs: ["6 nucleos / 12 threads", "3.9GHz / 4.4GHz turbo", "Cache L3 16 MB", "GPU Radeon Vega 7", "Socket AM4"]
  },

  // ARMAZENAMENTO
  {
    id: 11,
    name: "SSD Kingston NV2 1TB NVMe M.2",
    category: "armazenamento",
    price: 300,
    emoji: "💾",        // img: "img/ssd-1.jpg"
    desc: "SSD NVMe PCIe 4.0 com leitura de 3500 MB/s. Boot rapido e carregamento agil.",
    specs: ["1 TB", "Leitura 3500 MB/s", "Gravacao 2100 MB/s", "PCIe 4.0 NVMe M.2", "Garantia 5 anos"]
  },
  {
    id: 12,
    name: "HD Externo Seagate Expansion 2TB",
    category: "armazenamento",
    price: 300,
    badge: "Popular",
    emoji: "🗄️",       // img: "img/hd-externo-1.jpg"
    desc: "HD externo compacto plug-and-play com 2TB para backups e arquivos.",
    specs: ["2 TB", "USB 3.0", "Plug and Play", "Compativel PC e Mac", "Garantia 2 anos"]
  }

];

/* Card produto */
function createProductCard(p) {
  var visual;
  if (p.img) {
    visual = '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" '
           + 'onerror="this.parentElement.innerHTML=\'<span class=product-img-emoji>'
           + (p.emoji || "📦") + '</span>\'" />';
  } else {
    visual = '<span class="product-img-emoji" aria-hidden="true">' + (p.emoji || "📦") + '</span>';
  }

  var oldPriceHtml = p.oldPrice
    ? '<span class="product-old-price">' + formatPrice(p.oldPrice) + '</span>'
    : "";

  var badgeHtml = p.badge
    ? '<span class="product-badge">' + p.badge + '</span>'
    : "";

  return '<article class="product-card" data-id="' + p.id + '" role="button" tabindex="0" aria-label="Ver detalhes de ' + p.name + '">'
    + badgeHtml
    + '<div class="product-img">' + visual + '</div>'
    + '<div class="product-info">'
    + '<span class="product-cat">' + p.category + '</span>'
    + '<h3 class="product-name">' + p.name + '</h3>'
    + oldPriceHtml
    + '<span class="product-price">' + formatPrice(p.price) + '</span>'
    + '</div>'
    + '<button class="product-btn" data-id="' + p.id + '">Ver detalhes</button>'
    + '</article>';
}

/* Menu Responsivo */
function initMobileMenu() {
  var toggle = $("#nav-toggle");
  var nav    = $("#main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$(".nav-link", nav).forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Header */
function initHeaderScroll() {
  var header = $(".site-header");
  if (!header) return;
  window.addEventListener("scroll", function () {
    header.style.background = window.scrollY > 30
      ? "rgba(10,14,26,0.98)"
      : "rgba(10,14,26,0.9)";
  }, { passive: true });
}

/* HOME – DESTAQUES */
function renderFeatured() {
  var container = $("#featured-products");
  if (!container) return;
  var featured = PRODUCTS.filter(function (p) { return p.badge || p.oldPrice; }).slice(0, 4);
  container.innerHTML = featured.map(createProductCard).join("");
  bindProductCards(container);
}

/* CATÁLOGO – FILTROS */
var activeFilters = {
  category: "todos",
  minPrice: null,
  maxPrice: null,
  search: "",
  sort: "default"
};

function applyFilters() {
  var list = PRODUCTS.slice();

  if (activeFilters.category !== "todos") {
    list = list.filter(function (p) { return p.category === activeFilters.category; });
  }
  if (activeFilters.minPrice !== null) {
    list = list.filter(function (p) { return p.price >= activeFilters.minPrice; });
  }
  if (activeFilters.maxPrice !== null) {
    list = list.filter(function (p) { return p.price <= activeFilters.maxPrice; });
  }
  if (activeFilters.search) {
    var q = activeFilters.search.toLowerCase();
    list = list.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1
          || p.category.toLowerCase().indexOf(q) !== -1
          || p.desc.toLowerCase().indexOf(q) !== -1;
    });
  }
  if (activeFilters.sort === "price-asc")  list.sort(function (a, b) { return a.price - b.price; });
  if (activeFilters.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
  if (activeFilters.sort === "name-asc")   list.sort(function (a, b) { return a.name.localeCompare(b.name); });

  renderProducts(list);
}

function renderProducts(list) {
  var container = $("#products-container");
  var noResults = $("#no-results");
  var count     = $("#results-count");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "";
    if (noResults) noResults.hidden = false;
    if (count) count.textContent = "0 produtos encontrados";
    return;
  }

  if (noResults) noResults.hidden = true;
  if (count) count.textContent = list.length + " produto" + (list.length !== 1 ? "s" : "") + " encontrado" + (list.length !== 1 ? "s" : "");
  container.innerHTML = list.map(createProductCard).join("");
  bindProductCards(container);
}

function initCatalogFilters() {
  var container = $("#products-container");
  if (!container) return;

  renderProducts(PRODUCTS);

  var urlParams = new URLSearchParams(window.location.search);
  var catParam  = urlParams.get("cat");
  if (catParam) {
    var radio = $('input[name="cat"][value="' + catParam + '"]');
    if (radio) {
      radio.checked = true;
      activeFilters.category = catParam;
      applyFilters();
    }
  }

  $$("input[name='cat']").forEach(function (radio) {
    radio.addEventListener("change", function () {
      activeFilters.category = radio.value;
      applyFilters();
    });
  });

  var applyPriceBtn = $("#apply-price");
  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", function () {
      var minEl = $("#price-min");
      var maxEl = $("#price-max");
      activeFilters.minPrice = (minEl && minEl.value) ? +minEl.value : null;
      activeFilters.maxPrice = (maxEl && maxEl.value) ? +maxEl.value : null;
      applyFilters();
    });
  }

  var sortSel = $("#sort-select");
  if (sortSel) {
    sortSel.addEventListener("change", function () {
      activeFilters.sort = sortSel.value;
      applyFilters();
    });
  }

  var searchInput = $("#search-products");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeFilters.search = searchInput.value.trim();
      applyFilters();
    });
  }

  var clearBtn = $("#clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      activeFilters = { category: "todos", minPrice: null, maxPrice: null, search: "", sort: "default" };
      var allRadio = $('input[name="cat"][value="todos"]');
      if (allRadio) allRadio.checked = true;
      if (searchInput) searchInput.value = "";
      if (sortSel) sortSel.value = "default";
      var minEl = $("#price-min");
      var maxEl = $("#price-max");
      if (minEl) minEl.value = "";
      if (maxEl) maxEl.value = "";
      applyFilters();
    });
  }
}

/* MODAL DE PRODUTO */
function bindProductCards(ctx) {
  ctx = ctx || document;
  $$(".product-card", ctx).forEach(function (card) {
    card.addEventListener("click", function () { openModal(+card.dataset.id); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(+card.dataset.id); }
    });
  });
  $$(".product-btn", ctx).forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal(+btn.dataset.id);
    });
  });
}

function openModal(id) {
  var p       = PRODUCTS.find(function (x) { return x.id === id; });
  var overlay = $("#modal-overlay");
  if (!p || !overlay) return;

  var emojiEl = $("#modal-emoji");
  if (p.img) {
    emojiEl.innerHTML = '<img src="' + p.img + '" alt="' + p.name + '" '
      + 'style="width:100%;height:180px;object-fit:contain;border-radius:8px;background:var(--c-surface2);padding:8px" '
      + 'loading="lazy" onerror="this.parentElement.innerHTML=\'<span style=font-size:4rem>'
      + (p.emoji || "📦") + '</span>\'" />';
  } else {
    emojiEl.innerHTML = '<span style="font-size:4rem">' + (p.emoji || "📦") + '</span>';
  }

  $("#modal-product-name").textContent = p.name;
  $("#modal-product-desc").textContent = p.desc;
  $("#modal-price").textContent        = formatPrice(p.price);
  $("#modal-specs").innerHTML          = p.specs.map(function (s) { return "<li>" + s + "</li>"; }).join("");

  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(function () { var c = $("#modal-close"); if (c) c.focus(); }, 50);
}

function closeModal() {
  var overlay = $("#modal-overlay");
  if (!overlay) return;
  overlay.hidden = true;
  document.body.style.overflow = "";
}

function initModal() {
  var overlay  = $("#modal-overlay");
  var closeBtn = $("#modal-close");
  if (!overlay) return;
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
}

/* MÁSCARAS DE INPUT */
function maskCPF(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  return v.slice(0, 14);
}
function maskPhone(v) {
  var n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2)  return "(" + n;
  if (n.length <= 7)  return "(" + n.slice(0, 2) + ") " + n.slice(2);
  return "(" + n.slice(0, 2) + ") " + n.slice(2, 3) + " " + n.slice(3, 7) + "-" + n.slice(7);
}
function maskCEP(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  return v.slice(0, 9);
}

function initMasks() {
  var cpfEl = $("#cpf");
  var telEl = $("#telefone");
  var cepEl = $("#cep");
  if (cpfEl) cpfEl.addEventListener("input", function () { cpfEl.value = maskCPF(cpfEl.value); });
  if (telEl) telEl.addEventListener("input", function () { telEl.value = maskPhone(telEl.value); });
  if (cepEl) cepEl.addEventListener("input", function () { cepEl.value = maskCEP(cepEl.value); });
}

/* TOGGLE SENHA */
function initPasswordToggle() {
  $$(".toggle-password").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.dataset.target);
      if (!target) return;
      var isText = target.type === "text";
      target.type     = isText ? "password" : "text";
      btn.textContent = isText ? "👁" : "🙈";
    });
  });
}

/* VALIDAÇÃO DO FORMULÁRIO */
function showError(id, msg) {
  var el  = document.getElementById(id);
  var err = document.getElementById(id + "-error");
  if (el)  el.classList.add("error");
  if (err) err.textContent = msg;
}
function clearError(id) {
  var el  = document.getElementById(id);
  var err = document.getElementById(id + "-error");
  if (el)  { el.classList.remove("error"); el.classList.add("success"); }
  if (err) err.textContent = "";
}
function validateCPF(cpf) {
  var d = cpf.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  var s = 0, r, i;
  for (i = 0; i < 9; i++) s += +d[i] * (10 - i);
  r = (s * 10) % 11;
  if (r >= 10) r = 0;
  if (r !== +d[9]) return false;
  s = 0;
  for (i = 0; i < 10; i++) s += +d[i] * (11 - i);
  r = (s * 10) % 11;
  if (r >= 10) r = 0;
  return r === +d[10];
}

function validateForm() {
  var valid = true;
  var nome  = $("#nome");
  var email = $("#email");
  var cpf   = $("#cpf");
  var senha = $("#senha");
  var conf  = $("#confirma-senha");
  var termos = $("#termos");

  if (!nome.value.trim() || nome.value.trim().length < 3) {
    showError("nome", "Informe seu nome completo (min. 3 caracteres)."); valid = false;
  } else clearError("nome");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError("email", "Informe um e-mail valido."); valid = false;
  } else clearError("email");

  if (!validateCPF(cpf.value)) {
    showError("cpf", "CPF invalido."); valid = false;
  } else clearError("cpf");

  if (senha.value.length < 8) {
    showError("senha", "A senha deve ter no minimo 8 caracteres."); valid = false;
  } else clearError("senha");

  if (conf.value !== senha.value) {
    showError("confirma-senha", "As senhas nao coincidem."); valid = false;
  } else if (conf.value) clearError("confirma-senha");

  if (!termos.checked) {
    var terErr = $("#termos-error");
    if (terErr) terErr.textContent = "Voce deve aceitar os Termos de Uso.";
    valid = false;
  } else {
    var terErr2 = $("#termos-error");
    if (terErr2) terErr2.textContent = "";
  }

  return valid;
}

function initForm() {
  var form    = $("#cadastro-form");
  var success = $("#form-success");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      form.hidden = true;
      if (success) success.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  form.addEventListener("focusout", function (e) {
    var el = e.target;
    if (!el.id || !el.value) return;
    if (el.id === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) clearError("email");
      else showError("email", "E-mail invalido.");
    }
    if (el.id === "senha") {
      if (el.value.length >= 8) clearError("senha");
      else showError("senha", "Minimo 8 caracteres.");
    }
    if (el.id === "confirma-senha") {
      var s = $("#senha");
      if (s && el.value === s.value) clearError("confirma-senha");
      else showError("confirma-senha", "Senhas nao coincidem.");
    }
    if (el.id === "cpf") {
      if (validateCPF(el.value)) clearError("cpf");
      else showError("cpf", "CPF invalido.");
    }
  });
}

/* ANIMAÇÃO DE ENTRADA */
function initRevealOnScroll() {
  if (!("IntersectionObserver" in window)) return;
  var els = $$(".cat-card, .product-card, .benefit-item");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(function (el, i) {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(24px)";
    el.style.transition = "opacity 0.4s ease " + (i * 0.04) + "s, transform 0.4s ease " + (i * 0.04) + "s";
    observer.observe(el);
  });
}

/* INIT PRINCIPAL */
document.addEventListener("DOMContentLoaded", function () {
  var page = getPage();

  initMobileMenu();
  initHeaderScroll();
  initModal();

  if (page === "home")     renderFeatured();
  if (page === "produtos") initCatalogFilters();
  if (page === "cadastro") { initMasks(); initPasswordToggle(); initForm(); }

  requestAnimationFrame(function () { setTimeout(initRevealOnScroll, 100); });
});
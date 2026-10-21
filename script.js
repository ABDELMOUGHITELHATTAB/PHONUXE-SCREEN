
"use strict";

/* ========================================
   PHONUXE - CONFIGURATION
======================================== */

const WHATSAPP_NUMBER = "212666116382";
const QUANTITY_STEP = 10;
const MODELS_PER_PAGE = 10;
const PRICE_NORMAL = 5;
const PRICE_WHOLESALE = 4.5;
const WHOLESALE_MINIMUM = 500;

/* ========================================
   CATALOGUE
   Vérifie les modèles selon ton stock.
======================================== */

const BRANDS = [
  {
    id: 'samsung',
    name: 'Samsung',
    description: "Protection d'écran Samsung",
    logo: 'sam',
    models: [
      "Galaxy A12", "Galaxy A02", "Galaxy A02s",
      "Galaxy A03", "Galaxy A03s", "Galaxy A03 Core",
      "Galaxy A04", "Galaxy A04s", "Galaxy A04 Core",
      "Galaxy A04e", "Galaxy A13", "Galaxy A13 5G",
      "Galaxy A23", "Galaxy A23 5G", "Galaxy A32 5G",
      "Galaxy M02", "Galaxy M02s", "Galaxy M04",
      "Galaxy M12", "Galaxy M13", "Galaxy M13 5G",
      "Galaxy M13 India", "Galaxy M23", "Galaxy M32 5G",
      "Galaxy M33", "Galaxy F02s", "Galaxy F04",
      "Galaxy F12", "Galaxy F13", "Galaxy F23",
      "Galaxy A10s", "Galaxy M10", "Galaxy M20",
      "Galaxy A10", "Galaxy M01s", "Galaxy A21s",
      "Galaxy F52 5G", "Galaxy A05", "Galaxy A06",
      "Galaxy A06 5G", "Galaxy A07", "Galaxy M05",
      "Galaxy M06", "Galaxy M07", "Galaxy F05",
      "Galaxy F06 5G", "Galaxy F07", "Galaxy A15",
      "Galaxy A15 5G", "Galaxy A25", "Galaxy A24 4G",
      "Galaxy M34 5G", "Galaxy F34", "Galaxy F15",
      "Galaxy M15", "Galaxy A16", "Galaxy A16 5G",
      "Galaxy A17", "Galaxy A26", "Galaxy M16",
      "Galaxy M17", "Galaxy M36", "Galaxy F16",
      "Galaxy F17", "Galaxy F36", "Galaxy A30",
      "Galaxy A50", "Galaxy A20", "Galaxy A30s",
      "Galaxy A50s", "Galaxy M10s", "Galaxy M21",
      "Galaxy M21s", "Galaxy M21 2021", "Galaxy M30",
      "Galaxy M30s", "Galaxy M31", "Galaxy M31 Prime",
      "Galaxy F41", "Galaxy A34 5G", "Galaxy A36",
      "Galaxy A37", "Galaxy A56", "Galaxy A57",
      "Galaxy M56", "Galaxy F56", "Galaxy S24 FE",
      "Galaxy S25 FE", "Galaxy M47", "Galaxy M36 5G",
      "Galaxy A54", "Galaxy S23 FE 5G", "Galaxy A70",
      "Galaxy A70s", "Galaxy A42 5G", "Galaxy M42 5G",
      "Galaxy S24", "Galaxy S25", "Galaxy S24 Plus",
      "Galaxy S24 Ultra", "Galaxy S25 Ultra", "Galaxy S26",
      "Galaxy S26 Ultra"
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / Redmi',
    description: "Protection d'écran Xiaomi & Redmi",
    logo: 'mi',
    models: [
      "Redmi 9A", "Redmi 9C", "Redmi 9i",
      "Redmi 9 Activ", "Redmi 10A", "Redmi 10C",
      "Redmi 10 India", "Redmi 10 Power", "Redmi 11A",
      "Redmi 12C", "Redmi A3", "Redmi A3X",
      "Redmi 12 4G", "Redmi 12 5G", "Redmi 13 4G",
      "Redmi 13 5G", "Redmi 13X", "Redmi Note 12R",
      "Redmi Note 13R", "Redmi 13C 4G", "Redmi 13C 5G",
      "Redmi 13R", "Redmi 14C 4G", "Redmi 14C 5G",
      "Redmi 14R 5G", "Redmi 17C", "Redmi A3 Pro",
      "Redmi A4 5G", "Redmi A5 4G", "Redmi 15 4G",
      "Redmi 15 5G", "Redmi 15C 4G", "Redmi 15C 5G",
      "Redmi 15A 5G", "Redmi 17 5G", "Redmi R70",
      "Redmi R70M", "Redmi A7 Pro", "Redmi Note 10",
      "Redmi Note 10S", "Redmi Note 11", "Redmi Note 11S",
      "Redmi Note 11SE", "Redmi Note 12S", "Redmi Note 10 Pro",
      "Redmi Note 10 Pro Max", "Redmi Note 11 Pro", "Redmi Note 11 Pro+",
      "Redmi Note 11E Pro", "Redmi Note 13 4G", "Redmi Note 14 4G",
      "Redmi Note 14 5G", "Redmi Note 14 SE", "Redmi Note 12 Pro 4G",
      "Redmi Note 12 Pro 5G", "Redmi Note 12 Pro+", "Redmi Note 12 Explorer",
      "Redmi Note 12 Turbo", "Redmi Note 13 5G", "Redmi Note 13 Pro 4G",
      "Redmi Note 13 Pro 5G", "Redmi Note 13R Pro", "Redmi Note 14S",
      "Redmi Note 15 Pro China", "Redmi Note 15 Pro 5G Global", "Redmi 9",
      "Redmi 9 Prime", "Redmi 9 Power", "Redmi 9T",
      "Redmi Note 8", "Redmi Note 8 Pro", "Redmi Note 9",
      "Redmi Note 9 4G", "Redmi Note 9 5G", "Redmi Note 9T 5G",
      "Redmi Note 9S", "Redmi Note 9 Pro", "Redmi Note 9 Pro Max",
      "Redmi Note 10 Lite", "Redmi 11 Prime", "Redmi 11 Prime 5G",
      "Redmi A1", "Redmi A1+", "Redmi A2",
      "Redmi A2+", "Redmi 10 5G", "Redmi 10X 4G",
      "Redmi 10X 5G", "Redmi 10X Pro 5G", "Redmi 10 Prime+ 5G",
      "Redmi Note 11E", "Redmi Note 11R", "Redmi Note 11T 5G",
      "Redmi Note 11T Pro", "Redmi Note 11T Pro+", "Redmi Note 12T Pro",
      "Redmi K50i", "Redmi K30", "Redmi K30 5G",
      "Redmi K30S", "Redmi K30 Pro", "Redmi K40",
      "Redmi K40S", "Redmi K40 Pro", "Redmi K40 Pro+",
      "Redmi K50", "Redmi K50 Pro", "Redmi K60E",
      "Redmi K70", "Redmi K70E", "Redmi K70 Pro",
      "Redmi K70 Ultra", "Redmi K80", "Redmi K80 Pro",
      "Redmi K80 Ultra", "Redmi K90 Max 5G", "Redmi K90 Pro Max",
      "Redmi Turbo 3", "Redmi Turbo 4", "Redmi Turbo 4 Pro 5G",
      "Redmi Turbo 5 Max"
    ]
  },
  {
    id: 'iphone',
    name: 'iPhone',
    description: "Protection d'écran Apple iPhone",
    logo: 'ip',
    models: [
      "iPhone X", "iPhone XS", "iPhone XR",
      "iPhone XS Max", "iPhone 11", "iPhone 11 Pro",
      "iPhone 11 Pro Max", "iPhone 12", "iPhone 12 Pro",
      "iPhone 12 Pro Max", "iPhone 13", "iPhone 13 Pro",
      "iPhone 13 Pro Max", "iPhone 14", "iPhone 14 Plus",
      "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15",
      "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
      "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro",
      "iPhone 16 Pro Max", "iPhone 17", "iPhone 17 Air",
      "iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone 18 Pro",
      "iPhone 18 Pro Max"
    ]
  },
  {
    id: 'infinix',
    name: 'Infinix',
    description: "Protection d'écran Infinix",
    logo: 'I',
    models: [
      "Infinix Smart 8", "Infinix Smart 8 Pro", "Infinix Smart 9",
      "Infinix Smart 10", "Infinix Smart 20", "Infinix Hot 40i",
      "Infinix Hot 70"
    ]
  }
];

/* ========================================
   ÉTAT DE L'APPLICATION
======================================== */

const quantities = Object.create(null);
const visibleLimits = Object.create(null);

let activeBrand = "all";
let searchTerm = "";

BRANDS.forEach(function (brand) {
  visibleLimits[brand.id] = MODELS_PER_PAGE;
});

/* ========================================
   OUTILS
======================================== */

function getElement(id) {
  return document.getElementById(id);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

function getModelId(brandId, model) {
  return brandId + "::" + model;
}

function getAllModels() {
  return BRANDS.flatMap(function (brand) {
    return brand.models.map(function (model) {
      return {
        id: getModelId(brand.id, model),
        brandId: brand.id,
        brandName: brand.name,
        name: model
      };
    });
  });
}

/* ========================================
   AFFICHAGE DU CATALOGUE
======================================== */

function renderCatalog() {
  const container = getElement("catalogGroups");

  if (!container) return;

  container.innerHTML = BRANDS.map(function (brand) {
    const modelsHTML = brand.models.map(function (model, index) {
      const id = getModelId(brand.id, model);
      const quantity = quantities[id] || 0;
      const outputId = "qty-" + brand.id + "-" + index;

      return `
        <article
          class="model-card"
          data-model-id="${escapeHTML(id)}"
          data-brand="${escapeHTML(brand.id)}"
          data-model-name="${escapeHTML(model.toLowerCase())}"
          hidden
        >
          <div class="model-top">
            <div class="model-device" aria-hidden="true"></div>

            <div>
              <h4 class="model-name">${escapeHTML(model)}</h4>
              <p class="model-subtitle">Protection d'écran</p>
            </div>
          </div>

          <div class="model-bottom">
            <div class="quantity-control">
              <button
                type="button"
                data-action="decrease"
                data-id="${escapeHTML(id)}"
                aria-label="Diminuer de 10"
              >−</button>

              <output id="${escapeHTML(outputId)}"
                aria-live="polite">${quantity}</output>

              <button
                type="button"
                data-action="increase"
                data-id="${escapeHTML(id)}"
                aria-label="Ajouter 10"
              >+</button>
            </div>

            <span class="add-label">+10 unités</span>
          </div>
        </article>
      `;
    }).join("");

    return `
      <section class="brand-group" data-group="${escapeHTML(brand.id)}" hidden>
        <div class="brand-heading">
          <div class="brand-logo ${escapeHTML(brand.id)}"
            aria-label="${escapeHTML(brand.name)}">
            ${escapeHTML(brand.logo)}
          </div>

          <div>
            <h3>${escapeHTML(brand.name)}</h3>
            <p>${escapeHTML(brand.description)}</p>
          </div>
        </div>

        <div class="model-grid">
          ${modelsHTML}
        </div>

        <div class="view-more-wrap" data-view-more-wrap="${escapeHTML(brand.id)}" hidden>
          <button
            type="button"
            class="view-more-btn"
            data-action="view-more"
            data-brand="${escapeHTML(brand.id)}"
          >
            Voir plus <span>↓</span>
          </button>
        </div>
      </section>
    `;
  }).join("");

  updateModelCount();
  applyFilters();
}

/* ========================================
   FILTRES, RECHERCHE ET VOIR PLUS
======================================== */

function applyFilters() {
  const container = getElement("catalogGroups");
  if (!container) return;

  const groups = container.querySelectorAll(".brand-group");

  groups.forEach(function (group) {
    const brandId = group.dataset.group;

    const cards = Array.from(
      group.querySelectorAll(".model-card")
    );

    const matchingCards = cards.filter(function (card) {
      const matchesBrand =
        activeBrand === "all" ||
        card.dataset.brand === activeBrand;

      const matchesSearch =
        card.dataset.modelName.includes(searchTerm);

      return matchesBrand && matchesSearch;
    });

    const limit = visibleLimits[brandId] || MODELS_PER_PAGE;
    const showAllMatching = searchTerm.length > 0;

    matchingCards.forEach(function (card, index) {
      card.hidden = !showAllMatching && index >= limit;
    });

    cards.forEach(function (card) {
      if (!matchingCards.includes(card)) {
        card.hidden = true;
      }
    });

    const groupIsActive =
      activeBrand === "all" ||
      activeBrand === brandId;

    group.hidden =
      !groupIsActive || matchingCards.length === 0;

    const moreWrap = group.querySelector(
      "[data-view-more-wrap]"
    );

    const moreButton = moreWrap
      ? moreWrap.querySelector(".view-more-btn")
      : null;

    if (moreWrap && moreButton) {
      const remaining = matchingCards.length - limit;

      moreWrap.hidden =
        showAllMatching ||
        !groupIsActive ||
        remaining <= 0;

      moreButton.innerHTML =
        'Voir plus <span>↓</span> (' +
        Math.min(MODELS_PER_PAGE, Math.max(0, remaining)) +
        ')';
    }
  });

  updateNoResults();

  document.querySelectorAll(".brand-tab").forEach(function (button) {
    const selected = button.dataset.brand === activeBrand;

    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function updateNoResults() {
  const container = getElement("catalogGroups");
  let noResults = getElement("noResults");

  const visibleCards = container.querySelectorAll(
    ".model-card:not([hidden])"
  );

  if (visibleCards.length === 0) {
    if (!noResults) {
      noResults = document.createElement("p");
      noResults.id = "noResults";
      noResults.className = "no-results";
      noResults.textContent =
        "ما لقيناش هاد الموديل. جرب اسم آخر.";

      container.appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

function updateModelCount() {
  const element = getElement("modelCount");

  if (element) {
    const count = getAllModels().length;
    element.textContent = count + " موديل فالقائمة";
  }
}

function selectBrand(brandId) {
  activeBrand = brandId;
  searchTerm = "";

  getElement("searchInput").value = "";

  BRANDS.forEach(function (brand) {
    visibleLimits[brand.id] = MODELS_PER_PAGE;
  });

  applyFilters();
}

function showMoreModels(brandId) {
  if (!visibleLimits[brandId]) return;

  visibleLimits[brandId] += MODELS_PER_PAGE;
  applyFilters();
}

/* ========================================
   QUANTITÉS
======================================== */

function changeQuantity(id, direction) {
  const modelExists = getAllModels().some(function (model) {
    return model.id === id;
  });

  if (!modelExists) return;

  const current = quantities[id] || 0;

  quantities[id] = Math.max(
    0,
    current + direction * QUANTITY_STEP
  );

  updateQuantityDisplay(id);
  renderCart();
}

function updateQuantityDisplay(id) {
  const model = getAllModels().find(function (item) {
    return item.id === id;
  });

  if (!model) return;

  const brand = BRANDS.find(function (item) {
    return item.id === model.brandId;
  });

  if (!brand) return;

  const index = brand.models.indexOf(model.name);
  const output = getElement(
    "qty-" + brand.id + "-" + index
  );

  if (output) {
    output.textContent = String(quantities[id] || 0);
  }
}

/* ========================================
   PANIER ET PRIX
======================================== */

function getCartItems() {
  return getAllModels()
    .filter(function (model) {
      return (quantities[model.id] || 0) > 0;
    })
    .map(function (model) {
      return {
        ...model,
        quantity: quantities[model.id]
      };
    });
}

function getTotalQuantity() {
  return getCartItems().reduce(function (total, item) {
    return total + item.quantity;
  }, 0);
}

function getUnitPrice(totalQuantity) {
  return totalQuantity >= WHOLESALE_MINIMUM
    ? PRICE_WHOLESALE
    : PRICE_NORMAL;
}

function formatMoney(amount) {
  return amount.toLocaleString("fr-MA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + " DH";
}

function renderCart() {
  const container = getElement("cartItems");
  if (!container) return;

  const items = getCartItems();
  const totalQuantity = getTotalQuantity();
  const unitPrice = getUnitPrice(totalQuantity);
  const totalPrice = totalQuantity * unitPrice;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <span>＋</span>
        <p>مازال ما اخترتي حتى موديل.</p>
        <small>رجع للائحة وزيد الكميات اللي محتاج.</small>
      </div>
    `;
  } else {
    container.innerHTML = items.map(function (item) {
      return `
        <div class="cart-row">
          <div class="cart-row-info">
            <strong>${escapeHTML(item.name)}</strong>
            <small>${escapeHTML(item.brandName)} · ${item.quantity} وحدة</small>
          </div>
          <b>${formatMoney(item.quantity * unitPrice)}</b>
        </div>
      `;
    }).join("");
  }

  getElement("totalQuantity").textContent =
    totalQuantity.toLocaleString("fr-MA");

  getElement("unitPrice").textContent =
    formatMoney(unitPrice);

  getElement("grandTotal").textContent =
    formatMoney(totalPrice);

  const hint = getElement("priceHint");

  if (totalQuantity >= WHOLESALE_MINIMUM) {
    hint.textContent =
      "استافدتي من ثمن الجملة: 4.50 DH للوحدة.";
  } else {
    const remaining = WHOLESALE_MINIMUM - totalQuantity;

    hint.textContent = totalQuantity === 0
      ? "زيد الكمية حتى 500 وحدة باش تستافد من ثمن 4.50 DH."
      : "باقي ليك " + remaining +
        " وحدة باش تستافد من ثمن 4.50 DH.";
  }

  const submitButton = getElement("submitOrder");

  if (submitButton) {
    submitButton.disabled = totalQuantity === 0;
  }
}

function clearCart() {
  Object.keys(quantities).forEach(function (id) {
    quantities[id] = 0;
    updateQuantityDisplay(id);
  });

  renderCart();
}

/* ========================================
   COMMANDE WHATSAPP
======================================== */

function buildWhatsAppMessage(customer) {
  const items = getCartItems();
  const totalQuantity = getTotalQuantity();
  const unitPrice = getUnitPrice(totalQuantity);
  const totalPrice = totalQuantity * unitPrice;

  const lines = [
    " *طلب جديد - PHONUXE*",
    "",
    "*معلومات الزبون:*",
    "الاسم: " + customer.name,
    "الهاتف: " + customer.phone,
    "المدينة: " + customer.city,
    "العنوان: " + customer.address,
    "",
    "*تفاصيل الطلب:*"
  ];

  items.forEach(function (item, index) {
    lines.push(
      (index + 1) + ". " + item.brandName + " - " + item.name,
      "الكمية: " + item.quantity + " وحدة",
      "المجموع: " + formatMoney(item.quantity * unitPrice),
      ""
    );
  });

  lines.push(
    "-------------------------",
    "مجموع الوحدات: " + totalQuantity,
    "ثمن الوحدة: " + formatMoney(unitPrice),
    "الثمن الإجمالي: " + formatMoney(totalPrice),
    "",
    "شكراً PHONUXE."
  );

  return lines.join("\n");
}

function handleOrderSubmit(event) {
  event.preventDefault();

  const formMessage = getElement("formMessage");

  if (getCartItems().length === 0) {
    formMessage.textContent =
      "خاصك تختار موديل واحد على الأقل.";
    return;
  }

  const customer = {
    name: getElement("customerName").value.trim(),
    phone: getElement("customerPhone").value.trim(),
    city: getElement("customerCity").value.trim(),
    address: getElement("customerAddress").value.trim()
  };

  if (
    !customer.name ||
    !customer.phone ||
    !customer.city ||
    !customer.address
  ) {
    formMessage.textContent =
      "عمر معلومات التوصيل كاملة.";
    return;
  }

  if (!/^[0-9+\s().-]{8,20}$/.test(customer.phone)) {
    formMessage.textContent =
      "راجع رقم الهاتف، راه ما باينش صحيح.";
    return;
  }

  const message = buildWhatsAppMessage(customer);

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  const newWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  if (!newWindow) {
    formMessage.textContent =
      "إلا ما تحلش WhatsApp، دخل للرابط https://wa.me/" +
      WHATSAPP_NUMBER;
  } else {
    formMessage.textContent =
      "راجع تفاصيل الطلب فـ WhatsApp وضغط على إرسال.";
  }
}

/* ========================================
   ÉVÉNEMENTS
======================================== */

function setupEvents() {
  const catalog = getElement("catalogGroups");

  catalog.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    if (action === "view-more") {
      showMoreModels(button.dataset.brand);
      return;
    }

    if (action === "increase") {
      changeQuantity(button.dataset.id, 1);
      return;
    }

    if (action === "decrease") {
      changeQuantity(button.dataset.id, -1);
    }
  });

  document.querySelectorAll(".brand-tab").forEach(function (button) {
    button.addEventListener("click", function () {
      selectBrand(button.dataset.brand);
    });
  });

  getElement("searchInput").addEventListener("input", function (event) {
    searchTerm = event.target.value.trim().toLowerCase();

    // La recherche doit aussi chercher dans les modèles cachés.
    applyFilters();
  });

  getElement("clearCart").addEventListener("click", clearCart);

  getElement("orderForm").addEventListener(
    "submit",
    handleOrderSubmit
  );
}

/* ========================================
   INITIALISATION
======================================== */

function init() {
  const year = getElement("currentYear");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  renderCatalog();
  renderCart();
  setupEvents();

  // Afficher uniquement les 10 premiers modèles
  // du premier onglet "Tous".
  selectBrand("all");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
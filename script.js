
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
    id: "samsung",
    name: "Samsung",
    description: "Protection d'écran Samsung",
    logo: "S",
    models: [
      "Galaxy A05", "Galaxy A05s", "Galaxy A06",
      "Galaxy A12", "Galaxy A13", "Galaxy A14",
      "Galaxy A15", "Galaxy A16", "Galaxy A17",
      "Galaxy A20", "Galaxy A21s", "Galaxy A22 4G",
      "Galaxy A23", "Galaxy A24", "Galaxy A25",
      "Galaxy A26", "Galaxy A30", "Galaxy A31",
      "Galaxy A32 4G", "Galaxy A33 5G", "Galaxy A34 5G",
      "Galaxy A35 5G", "Galaxy A36 5G", "Galaxy A50",
      "Galaxy A51", "Galaxy A52", "Galaxy A52s",
      "Galaxy A53 5G", "Galaxy A54 5G", "Galaxy A55 5G",
      "Galaxy A56 5G", "Galaxy A70", "Galaxy A71",
      "Galaxy A72", "Galaxy A73 5G",
      "Galaxy S20", "Galaxy S20 FE", "Galaxy S21",
      "Galaxy S21 FE", "Galaxy S21 Ultra", "Galaxy S22",
      "Galaxy S22 Plus", "Galaxy S22 Ultra", "Galaxy S23",
      "Galaxy S23 Plus", "Galaxy S23 Ultra", "Galaxy S24",
      "Galaxy S24 Plus", "Galaxy S24 Ultra", "Galaxy S25",
      "Galaxy S25 Plus", "Galaxy S25 Ultra",
      "Galaxy Note 10", "Galaxy Note 10 Plus",
      "Galaxy Note 20", "Galaxy Note 20 Ultra"
    ]
  },
  {
    id: "xiaomi",
    name: "Xiaomi / Redmi",
    description: "Protection d'écran Xiaomi & Redmi",
    logo: "mi",
    models: [
      "Redmi 9A", "Redmi 9C", "Redmi 10",
      "Redmi 10C", "Redmi 12", "Redmi 12C",
      "Redmi 13C", "Redmi 14C", "Redmi 15C",
      "Redmi Note 8", "Redmi Note 8 Pro",
      "Redmi Note 9", "Redmi Note 9S", "Redmi Note 9 Pro",
      "Redmi Note 10", "Redmi Note 10S", "Redmi Note 10 Pro",
      "Redmi Note 11", "Redmi Note 11S", "Redmi Note 11 Pro",
      "Redmi Note 12 4G", "Redmi Note 12 5G",
      "Redmi Note 12 Pro", "Redmi Note 12 Pro Plus",
      "Redmi Note 13 4G", "Redmi Note 13 5G",
      "Redmi Note 13 Pro 4G", "Redmi Note 13 Pro 5G",
      "Redmi Note 13 Pro Plus", "Redmi Note 14 4G",
      "Redmi Note 14 5G", "Redmi Note 14 Pro 4G",
      "Redmi Note 14 Pro 5G", "Redmi Note 14 Pro Plus",
      "Redmi Note 15", "Redmi Note 15 Pro",
      "Xiaomi 11 Lite", "Xiaomi 11T", "Xiaomi 11T Pro",
      "Xiaomi 12", "Xiaomi 12 Lite", "Xiaomi 12T",
      "Xiaomi 12T Pro", "Xiaomi 13", "Xiaomi 13 Lite",
      "Xiaomi 13T", "Xiaomi 13T Pro", "Xiaomi 14",
      "Xiaomi 14T", "Xiaomi 14T Pro",
      "Poco X3", "Poco X3 Pro", "Poco X4 Pro",
      "Poco X5 Pro", "Poco X6", "Poco X6 Pro",
      "Poco X7", "Poco X7 Pro"
    ]
  },
  {
    id: "iphone",
    name: "iPhone",
    description: "Protection d'écran Apple iPhone",
    logo: "●",
    models: [
      "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
      "iPhone 12", "iPhone 12 mini", "iPhone 12 Pro",
      "iPhone 12 Pro Max", "iPhone 13", "iPhone 13 mini",
      "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone 14",
      "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
      "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro",
      "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Plus",
      "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 16e",
      "iPhone 17", "iPhone 17 Pro", "iPhone 17 Pro Max",
      "iPhone 17 Air"
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
    "🛍️ *طلب جديد - PHONUXE*",
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
    "شكراً على اختيار PHONUXE."
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
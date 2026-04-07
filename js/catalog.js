(function (global) {
  var PRODS_URL = "json/prods.json";
  var CAT_LABELS = {
    gach: "Gạch men",
    son: "Sơn nước",
    vesinh: "Thiết bị vệ sinh",
  };

  function catLabel(c) {
    return CAT_LABELS[c] || c || "";
  }

  function primaryImage(p) {
    if (p.image) return p.image;
    if (p.images && p.images.length) return p.images[0];
    return "";
  }

  function buildProductCard(p) {
    var art = document.createElement("article");
    art.className = "product-card";
    art.dataset.category = p.category || "";

    var wrap = document.createElement("div");
    wrap.className = "img-wrap";
    var img = document.createElement("img");
    img.src = primaryImage(p);
    img.alt = p.title || "";
    img.loading = "lazy";
    img.width = 800;
    img.height = 800;
    wrap.appendChild(img);

    var info = document.createElement("div");
    info.className = "info";
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = catLabel(p.category);
    var h3 = document.createElement("h3");
    h3.textContent = p.title || "";
    var price = document.createElement("p");
    price.className = "price";
    price.textContent = p.price || "Liên hệ";
    var a = document.createElement("a");
    a.className = "btn btn-primary btn-block";
    a.href = "product_detail.html?id=" + encodeURIComponent(p.id);
    a.textContent = "Xem chi tiết";
    info.appendChild(tag);
    info.appendChild(h3);
    info.appendChild(price);
    info.appendChild(a);

    art.appendChild(wrap);
    art.appendChild(info);
    return art;
  }

  function fetchCatalog() {
    return fetch(PRODS_URL).then(function (r) {
      if (!r.ok) throw new Error("Không tải được danh sách sản phẩm");
      return r.json();
    });
  }

  global.NTShop = {
    PRODS_URL: PRODS_URL,
    catLabel: catLabel,
    primaryImage: primaryImage,
    buildProductCard: buildProductCard,
    fetchCatalog: fetchCatalog,
  };
})(window);

const products = [
  {
    id: 1,
    name: "VinFast Lux A2.0",
    brand: "vinfast",
    type: "sedan",
    price: 1129000000,
    image: "../../Assets/image/vinfast_lux.jpg",
    specs: {
      engine: "2.0L Turbo",
      seats: "5 chỗ",
      fuel: "Xăng"
    },
    description: "Sedan hạng sang của VinFast với thiết kế sang trọng và công nghệ hiện đại",
    badge: "Hot"
  },
  {
    id: 2,
    name: "BMW XM",
    brand: "bmw",
    type: "suv",
    price: 10999000000,
    image: "../../Assets/image/bmw xm.jpg",
    specs: {
      engine: "V8 Hybrid",
      seats: "5 chỗ",
      fuel: "Hybrid"
    },
    description: "SUV hiệu suất cao với động cơ hybrid mạnh mẽ",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Tesla Cybertruck",
    brand: "tesla",
    type: "pickup",
    price: 3500000000,
    image: "../../Assets/image/tesla.jpg",
    specs: {
      engine: "Điện",
      seats: "5 chỗ",
      fuel: "Điện"
    },
    description: "Bán tải điện với thiết kế tương lai và công nghệ tiên tiến",
    badge: "Mới"
  },
  {
    id: 4,
    name: "Toyota Camry",
    brand: "toyota",
    type: "sedan",
    price: 1235000000,
    image: "../../Assets/image/toyotacamry.jpg",
    specs: {
      engine: "2.5L",
      seats: "5 chỗ",
      fuel: "Xăng"
    },
    description: "Sedan đáng tin cậy với chi phí vận hành thấp",
    badge: "Bán chạy"
  },
  {
    id: 5,
    name: "Honda CR-V",
    brand: "honda",
    type: "suv",
    price: 1029000000,
    image: "../../Assets/image/hondacrv.jpg",
    specs: {
      engine: "1.5L Turbo",
      seats: "7 chỗ",
      fuel: "Xăng"
    },
    description: "SUV 7 chỗ rộng rãi, tiết kiệm nhiên liệu",
    badge: "Hot"
  },
  {
    id: 6,
    name: "Mazda CX-5",
    brand: "mazda",
    type: "suv",
    price: 859000000,
    image: "../../Assets/image/mazda.cx5.jpg",
    specs: {
      engine: "2.0L",
      seats: "5 chỗ",
      fuel: "Xăng"
    },
    description: "SUV thể thao với thiết kế KODO ấn tượng",
    badge: "Giá tốt"
  },
  {
    id: 7,
    name: "Hyundai Tucson",
    brand: "hyundai",
    type: "suv",
    price: 799000000,
    image: "../../Assets/image/huyndai.jpg",
    specs: {
      engine: "2.0L",
      seats: "5 chỗ",
      fuel: "Xăng"
    },
    description: "SUV đẳng cấp với trang bị an toàn vượt trội",
    badge: "Mới"
  },
  {
    id: 8,
    name: "Kia Seltos",
    brand: "kia",
    type: "suv",
    price: 649000000,
    image: "../../Assets/image/seltos.jpg",
    specs: {
      engine: "1.5L",
      seats: "5 chỗ",
      fuel: "Xăng"
    },
    description: "SUV đô thị năng động cho giới trẻ",
    badge: "Hot"
  }
];

let filteredProducts = [...products];

function formatPrice(price) {
  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(3) + " tỷ";
  } else {
    return (price / 1000000).toFixed(0) + " triệu";
  }
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-badge">${product.badge}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-specs">
          <span><i class="fa-solid fa-car"></i> ${product.specs.engine}</span>
          <span><i class="fa-solid fa-users"></i> ${product.specs.seats}</span>
          <span><i class="fa-solid fa-gas-pump"></i> ${product.specs.fuel}</span>
        </div>
        <div class="product-price">
          Giá: ${formatPrice(product.price)} đ
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-actions">
          <button class="btn-buy" onclick="buyProduct(${product.id})">
            <i class="fa-solid fa-cart-shopping"></i> Mua ngay
          </button>
          <button class="btn-detail" onclick="viewDetail(${product.id})">
            <i class="fa-solid fa-circle-info"></i> Chi tiết
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(productsToRender) {
  const container = document.getElementById('products-container');
  if (productsToRender.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; grid-column: 1/-1;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 60px; color: #e22424; margin-bottom: 20px;"></i>
        <h3 style="color: #666;">Không tìm thấy sản phẩm phù hợp</h3>
        <p style="color: #999; margin-top: 10px;">Vui lòng thử lại với bộ lọc khác</p>
      </div>
    `;
    return;
  }
  container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
  addButtonEffects();
}

function filterProducts() {
  const brand = document.getElementById('brand').value;
  const type = document.getElementById('type').value;
  const priceRange = document.getElementById('price-range').value;

  filteredProducts = products.filter(product => {
    let matches = true;

    if (brand && product.brand !== brand) {
      matches = false;
    }

    if (type && product.type !== type) {
      matches = false;
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(v => parseInt(v) * 1000000);
      if (product.price < min || product.price > max) {
        matches = false;
      }
    }

    return matches;
  });

  renderProducts(filteredProducts);
}

function resetFilter() {
  document.getElementById('brand').value = '';
  document.getElementById('type').value = '';
  document.getElementById('price-range').value = '';
  filteredProducts = [...products];
  renderProducts(filteredProducts);
}

function buyProduct(id) {
  const product = products.find(p => p.id === id);
  alert(`✅ Đã thêm ${product.name} vào giỏ hàng!\nGiá: ${formatPrice(product.price)} đ`);
}

function viewDetail(id) {
  const product = products.find(p => p.id === id);
  alert(`📋 Thông tin chi tiết:\n\nTên xe: ${product.name}\nHãng: ${product.brand.toUpperCase()}\nLoại: ${product.type.toUpperCase()}\nĐộng cơ: ${product.specs.engine}\nSố chỗ: ${product.specs.seats}\nNhiên liệu: ${product.specs.fuel}\nGiá: ${formatPrice(product.price)} đ\n\nMô tả: ${product.description}`);
}

function addButtonEffects() {
  const buttons = document.querySelectorAll('.btn-buy, .btn-detail, .btn-filter');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonRect = e.target.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const xInside = x - buttonRect.left;
      const yInside = y - buttonRect.top;

      const circle = document.createElement('span');
      circle.classList.add('circle');
      circle.style.top = yInside + 'px';
      circle.style.left = xInside + 'px';
      this.appendChild(circle);

      setTimeout(() => circle.remove(), 500);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products);
});
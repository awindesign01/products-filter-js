// import items from "./db.json";
const searchInput = document.querySelector(".search");
const bottons = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
	searchItems: "",
};
const Products_center = document.querySelector(".Products_center");

document.addEventListener("DOMContentLoaded", () => {
	axios
		.get("https://fakestoreapi.com/products")
		.then((res) => {
			allProductsData = res.data;
			renderProducts(res.data, filters);
		})
		.catch((err) => {
			console.log(err);
		});
});

function renderProducts(_products, _filters) {
	const filterproducts = _products.filter((p) => {
		return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
	});
	Products_center.innerHTML = "";
	// console.log(filterproducts);

	filterproducts.forEach((item, index) => {
		const productsDiv = document.createElement("div");
		productsDiv.classList.add("products");
		productsDiv.innerHTML = `
        <article class="art_products">
				<img src=${item.image} alt="${index}" class="image" />
				<nav class="title">
					<p>${item.title}</p>
					<p>$ ${item.price}</p>
				</nav>
			</article>
            `;
		Products_center.appendChild(productsDiv);
	});
}

searchInput.addEventListener("input", (e) => {
	// console.log(e.target.value);
	filters.searchItems = e.target.value;
	renderProducts(allProductsData, filters);
});

bottons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // console.log(e.target.dataset.filter);
        filters.searchItems = e.target.dataset.filter;
        renderProducts(allProductsData, filters);
    })
})

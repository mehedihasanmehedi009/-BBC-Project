const CategoriesContainer = document.getElementById("Categories-Container");

const LoadCategories = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => Display(data.categories));
};
const Display = (mun) => {
  mun.forEach((cat) => {
    // console.log(cat);
    CategoriesContainer.innerHTML += `
    <li id="${cat.id}" class="hover:border-b-4 border-red-500 cursor-pointer">
            ${cat.title}
          </li>
    `;
  });
  CategoriesContainer.addEventListener("click", (e) => {
    if (e.target.locaName === "li") console.log(e.target);
    e.target.classList.add("border-b-4", "border-red-500");
  });
};

LoadCategories();

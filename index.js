const CategoriesContainer = document.getElementById("Categories-Container");

const LoadCategories = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => Display(data.categories));
};
const Display = (mun) => {
  mun.forEach((cat) => {
    CategoriesContainer.innerHTML += `
    <li class="hover:border-b-4 border-red-500 cursor-pointer">
            ${cat.title}
          </li>
    `;
  });
};

LoadCategories();

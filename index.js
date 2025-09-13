const CategoriesContainer = document.getElementById("Categories-Container");
const NewsContainer = document.getElementById("news-container");
const BookMarekContainer = document.getElementById("BookMarek-Container");

// heder function
const LoadCategories = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => Display(data.categories));
};
const Display = (mun) => {
  mun.forEach((cat) => {
    // console.log(cat);
    CategoriesContainer.innerHTML += `
    <li id="${cat.id}"  class="border-red-500  hover:border-red-500 hover:border-b-4  cursor-pointer">
            ${cat.title}
          </li>
    `;
  });
  CategoriesContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => li.classList.remove("border-b-4"));
    if (e.target.localName === "li") e.target.classList.add("border-b-4");
    LoadNewsCategories(e.target.id);
  });
};

// img function and
const LoadNewsCategories = (categoryId) => {
  // console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategorys(data.articles);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showNewsByCategorys = (articles) => {
  NewsContainer.innerHTML = "";
  articles.forEach((article) => {
    NewsContainer.innerHTML += `
   <div class="rounded-lg border-2 border-gray-300" >
    <div>
  <img src="${article.image.srcset[5].url}" alt="" />
</div>
<h1 class="font-bold text-center mt-4 p-2">${article.title}</h1>
<p class=" mt-2 text-center">${article.time}</p>
 <button class='btn'>BookMark </button>
   </div>`;
  });
};
NewsContainer.addEventListener("click", (e) => {
  // console.log(e.target.innerText);
  if (e.target.innerText === "BookMark") {
    console.log("BookMark btn clicked");
    console.log(e.target.parentNode.parentNode.children);
  }
});

LoadCategories();
LoadNewsCategories("main");

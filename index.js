const CategoriesContainer = document.getElementById("Categories-Container");
const NewsContainer = document.getElementById("newsContainer");
const BookMarekContainer = document.getElementById("BookMarek-Container");
const countBookmark = document.getElementById("count-Bookmark");
const newsmodel = document.getElementById("my_modal_1");

const modalcontyner = document.getElementById("modal-contyner");

let Bookmarks = [];
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

    showloading();
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
      showError();
      alert("Something went wrong");
    });
};
const showNewsByCategorys = (articles) => {
  if (articles.length == 0) {
    showEmptyMessage();
    alert("Something went wrong");
    return;
  }
  NewsContainer.innerHTML = "";
  articles.forEach((article) => {
    // console.log(article);
    NewsContainer.innerHTML += `
   <div class="rounded-lg border-2 border-gray-300" >
  <img class=" w-full" src="${article.image.srcset[5].url}" alt="" />
   <div id="${article.id}" class=" p-2">
<h1 class="font-bold text-center mt-4 p-2">${article.title}</h1>
<p class=" mt-2 text-center">${article.time}</p>
 <button class='btn'>BookMark </button>
 <button " class='btn'>View Details </button>
 
 </div>
   </div>`;
  });
};
NewsContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(e.target.innerText);
  if (e.target.innerText === "BookMark") {
    // console.log("BookMark btn clicked");
    handelBookmark(e);
  }
  if (e.target.innerText === "View Details") {
    handelViewDetails(e);
  }
});

const handelBookmark = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  Bookmarks.push({
    title: title,
    id: id,
  });
  showBookmark(Bookmarks);
  countBookmark.innerText = Bookmarks.length;
};

const showBookmark = (BookMarks) => {
  BookMarekContainer.innerHTML = "";
  console.log(BookMarks);
  BookMarks.forEach((BookMark) => {
    BookMarekContainer.innerHTML += `
    <div class=" border border-gray-300 my-2 rounded-lg">
  <h1 class =" text-center p-2">${BookMark.title}</h1>
   <button onclick="handelDeleteBookmark('${BookMark.id}')" class="btn">Delete</button>
 
</div>
    `;
  });
};
const handelDeleteBookmark = (BookmarkId) => {
  const BookmarksFilter = Bookmarks.filter(
    (BookMark) => BookMark.id !== BookmarkId
  );
  Bookmarks = BookmarksFilter;
  showBookmark(Bookmarks);
};
const handelViewDetails = (e) => {
  const id = e.target.parentNode.id;
  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showDetailsNews(data.article);
    })
    .catch((err) => {
      console.log(err);
    });
  // newsmodel.showModal();
};
const showDetailsNews = (article) => {
  // console.log(article);
  newsmodel.showModal();
  modalcontyner.innerHTML = `
  <h1>${article.title}</h1>
<img src="${article.images[0].url}" alt="" />
<p>${article.content.join("")}</p>
  
  `;
};

const showloading = () => {
  NewsContainer.innerHTML = `
      <div>loading...</div>
  `;
};
const showError = () => {
  NewsContainer.innerHTML = `
      <div class="">Something went wrong</div>
  `;
};
const showEmptyMessage = () => {
  NewsContainer.innerHTML = `
      <div class="">No News Found for this categories</div>
  `;
};
LoadCategories();
LoadNewsCategories("main");

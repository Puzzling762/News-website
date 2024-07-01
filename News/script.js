const API_KEY = "8cca0844d1514c199c58a6ca5738ca0f";
const url = "https://newsapi.org/v2/everything?q=";
const corsProxy = "https://cors-anywhere.herokuapp.com/";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${corsProxy}${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); 
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    cardClone.querySelector('#news-img').src = article.urlToImage;
    cardClone.querySelector('#news-title').innerText = article.title;
    cardClone.querySelector('#news-source').innerText = `${article.source.name} - ${new Date(article.publishedAt).toLocaleDateString()}`;
    cardClone.querySelector('#news-desc').innerText = article.description;
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

function onSearchButtonClick() {
    const query = document.getElementById("search-text").value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
}

function reload() {
    window.location.reload();
}

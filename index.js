const API_KEY="69cda1072e5d4133995db050d462b84a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));


//The below 3 line off code is for the logo reload which will reload the feed to original
function reload(){
    window.location.reload();
}



async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    //the above code is the replica of website news.api url
    const data =await res.json();
    bindData(data.articles);
}


//Template ka clone banegae or conatiner mai dalegae the below function code
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML ='';//pahle se 100 news hai wapas call karegae to 100 news empty ho phie naya aee na ki 200 news ho jae

    articles.forEach(article =>{
        if(!article.urlToImage) return;//image nahi hai news mai to reject
        
        const cardClone = newsCardTemplate.content.cloneNode(true);//clone node ka matlab deep cloning jitni bi cheeze hai sab clone karo(sare div clone karo)

        fillDataCard(cardClone,article);
        cardsContainer.appendChild(cardClone);//article clone bantae jaegae or daltae jaegaee

    });
}

function fillDataCard(cardClone,article){
    const newsImg  = cardClone.querySelector('#news-img');
    const newsTitle  = cardClone.querySelector('#news-title');
    const newsSource  = cardClone.querySelector('#news-source');
    const newsDesc  = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    //The above function code is from anujh javascript (stack overflow)

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    //to open link new tab
    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url, "_blank");//To open the link in the new tab.
    });

}


let curSelectedNav = null;//starting mai null rakho feed
function onNavItemClick(id){
    fetchNews(id);//fetch news fetch bi karegaa aur data ko bind bi karegaa

    //or jab select karne jaogae kisi nav item ko tab
    const navItem = document.getElementById(id);
    
    curSelectedNav?.classList.remove('active');//agar new nav item ko click kiya hai to usko remove kardo
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}



const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);

    //the below 2 line code will remove the style of active of nav and make it null
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

});
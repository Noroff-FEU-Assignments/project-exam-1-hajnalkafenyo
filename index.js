const basePostUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/posts';
const mediaUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/media/';

let totalpages = 1
async function fetchData(url) {
    const response = await fetch(url);
    const c = await response.json();
    const totalPagesValue = response.headers.get('X-WP-Totalpages')
    if (totalPagesValue) {
        totalpages = totalPagesValue
    }
    console.log(totalpages);
    return c;
}

function mapPost(fullPost) {
    const neWData = {
        id: fullPost.id,
        title: fullPost.title.rendered,
        date: fullPost.date,
        excerpt: fullPost.excerpt.rendered,
        banner: fullPost.featured_media,
    }
    return neWData;
}

function mapMedia(fullMedia) {
    const newMedia = {
        url: fullMedia.media_details.sizes.thumbnail.source_url,
    }
    return newMedia;
}

function blogCard(postData, mediaData) {
    return `
    <div class="card">
                        <img class="card-picture" src="${mediaData.url}" alt="Card picture" /></a>
                        <h2>${postData.title}</h2>
                        <p>${postData.excerpt}</p>
                        <a href="article.html?id=${postData.id}" class="button">Read more...</a>
                    </div>
    `
}

let page = 1;
function nextPage() {
    if (page >= totalpages) {
        return
    }
    page++
    console.log(page);
    main()

}
function previousPage() {
    if (page <= 1) {
        return
    }
    page--
    console.log(page);
    main()

}

document.getElementById("right-arrow").addEventListener("click", nextPage);
document.getElementById("left-arrow").addEventListener("click", previousPage);

console.log('Mikor fogok lefutni');

async function main() {
    try {
        document.getElementById('carusel').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        const newUrl = basePostUrl + '?per_page=4' + `&page=${page}`;
        const listOfFullPosts = await fetchData(newUrl);
        let s = ""
        for (let i = 0; i < listOfFullPosts.length; i++) {
            const element = listOfFullPosts[i];
            const mappedPost = mapPost(element);
            const fullMediaUrl = mediaUrl + mappedPost.banner;
            const fullMedia = await fetchData(fullMediaUrl);
            const mappedMedia = mapMedia(fullMedia);
            const blogCardData = blogCard(mappedPost, mappedMedia);
            s += blogCardData
        }
        document.getElementById('card-container').innerHTML = s;

        document.getElementById('carusel').style.display = 'flex';
        document.getElementById('loading').style.display = 'none';
    } catch (e) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        console.error('There was an error when we tried to load the content')
        console.error(e)
    }
}
main()
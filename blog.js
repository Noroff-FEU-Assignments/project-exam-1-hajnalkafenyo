const basePostUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/posts';
const mediaUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/media/';

const container = document.getElementById('blog-container');

let totalPages;
async function fetchData(url) {
    const response = await fetch(url);
    const c = await response.json();
    if (response.headers.has("X-Wp-Totalpages")) {
        totalPages = parseInt(response.headers.get("X-Wp-Totalpages"))
    }
    return c;
}

function mapPost(fullPost) {
    const neWData = {
        id: fullPost.id,
        title: fullPost.title.rendered,
        date: fullPost.date.slice(0, 10),
        excerpt: fullPost.excerpt.rendered,
        banner: fullPost.featured_media,
    }
    return neWData;
}

function mapMedia(fullMedia) {
    const newMedia = {
        url: fullMedia.media_details.sizes.thumbnail.source_url,
        alt: fullMedia.alt_text,
    }
    return newMedia;
}

function blogCard(postData, mediaData) {
    return `
    
    <div class="blog-item">
                    <h2>${postData.title}</h2>
                    <div class="blog-item-content">
                        <img class="blog-item-thumbnail" src="${mediaData.url}" alt="${mediaData.alt}" /></a>
                        <div>
                            <p>${postData.excerpt}</p>
                            <p>${postData.date}</p>
                            <a href="article.html?id=${postData.id}" class="button">Read more...</a>
                        </div>
                    </div>
                </div>
    `
}

let page = 1;

async function main() {
    try {
        const fullUrl = `${basePostUrl}?page=${page}`
        const listOfFullPosts = await fetchData(fullUrl);
        let s = "";
        for (let i = 0; i < listOfFullPosts.length; i++) {
            const element = listOfFullPosts[i];
            const mappedPost = mapPost(element);
            const fullMediaUrl = mediaUrl + mappedPost.banner;
            const fullMedia = await fetchData(fullMediaUrl);
            const mappedMedia = mapMedia(fullMedia);
            const blogCardData = blogCard(mappedPost, mappedMedia);
            s += blogCardData
        }
        document.getElementById('blog-container').innerHTML += s;

        document.getElementById('blog-container').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        if (totalPages > page) {
            document.getElementById('loadMoreButton').style.display = "block";
        } else {
            document.getElementById('loadMoreButton').style.display = "none";
        }

    } catch (e) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        console.error('There was an error when we tried to load the content')
        console.error(e)
    }
}
main();

function buttonClick() {
    console.log('buttonklikk');
    page += 1;
    main();
}

const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', buttonClick);

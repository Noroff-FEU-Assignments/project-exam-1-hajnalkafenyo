const basePostUrl = 'http://book-blog-api.local/wp-json/wp/v2/posts';
const mediaUrl = 'http://book-blog-api.local/wp-json/wp/v2/media/';

const container = document.getElementById('blog-container');

async function fetchData(url) {
    const response = await fetch(url);
    const c = await response.json();
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
    
    <div class="blog-item">
                    <h2>${postData.title}</h2>
                    <div class="blog-item-content">
                        <img class="blog-item-thumbnail" src="${mediaData.url}" alt="Card picture" /></a>
                        <div>
                            <p>${postData.excerpt}</p>
                            <p>${postData.date}</p>
                            <a href="article.html?id=${postData.id}" class="button">Read more...</a>
                        </div>
                    </div>
                </div>
    `
}

async function main() {
    debugger;
    try {
        const listOfFullPosts = await fetchData(basePostUrl);
        //const post = mapPost(data);
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
        document.getElementById('blog-container').innerHTML = s;

        document.getElementById('blog-container').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    } catch (e) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        console.error('There was an error when we tried to load the content')
        console.error(e)
    }
}
main();
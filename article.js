
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const basePostUrl = 'http://book-blog-api.local/wp-json/wp/v2/posts/';
const fullPostUrl = basePostUrl + id;
const mediaUrl = 'http://book-blog-api.local/wp-json/wp/v2/media/';


/*
TODO: 2. Error handling
*/

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
        content: fullPost.content.rendered,
        banner: fullPost.featured_media,
    }
    return neWData;

}

function mapMedia(fullMedia) {
    const newMedia = {
        url: fullMedia.guid.rendered,
    }
    return newMedia;
}



function showBlogData(blogData) {
    document.getElementById('title').innerHTML = blogData.title;
    document.getElementById('article-container').innerHTML =
        blogData.content;

}

function showMedia(MediaObjectum) {
    document.getElementById('banner').src = MediaObjectum.url;
}

async function main() {
    debugger;
    try {
        const data = await fetchData(fullPostUrl);
        const post = mapPost(data);
        const fullMediaUrl = mediaUrl + post.banner;
        const fullMedia = await fetchData(fullMediaUrl);
        const MediaObjectum = mapMedia(fullMedia);
        showBlogData(post);
        showMedia(MediaObjectum);
        document.getElementById('content').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    } catch (e) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        console.error('There was an error when we tried to load the content')
        console.error(e)
    }
}

main()




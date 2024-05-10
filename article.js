
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const basePostUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/posts/';
const fullPostUrl = basePostUrl + id;
const mediaUrl = 'https://book-blog-hajnalka.flywheelsites.com/wp-json/wp/v2/media/';

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
        excerpt: fullPost.excerpt.rendered,
        banner: fullPost.featured_media,
    }
    return neWData;

}

function mapMedia(fullMedia) {
    const newMedia = {
        url: fullMedia.media_details.sizes.large.source_url,
        alt: fullMedia.alt_text,
    }
    return newMedia;
}



function showBlogData(blogData) {
    document.getElementById('title').innerHTML = blogData.title;
    document.title = blogData.title;
    document.getElementById('article-container').innerHTML =
        blogData.content + "<span>" + blogData.date.slice(0, 10) + "</span>";
    document.head.querySelector("meta[name=description]").content = blogData.excerpt;
    document.head.querySelector("meta[name=title]").content = blogData.title;

}

function showMedia(MediaObjectum) {
    document.getElementById('banner').src = MediaObjectum.url;
    document.getElementById('banner').alt = MediaObjectum.alt;
}

async function main() {
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




document.addEventListener("DOMContentLoaded", async () => {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    console.log(posts);
    if (posts.ok) {
        const allPosts = await posts.json();
        for (let post of allPosts) {
            const section = await createPost(post);
            document.getElementById("postsArea").appendChild(section);
        }
    }
});

const createPost = async post => {
    const section = document.createElement("section");
    section.classList.add("posts");

    const h3 = document.createElement("h3");
    const username = await fetchUser(post.userId);
    h3.innerText = username;
    section.appendChild(h3);

    const h4 = document.createElement("h4");
    h4.classList.add("post-title");
    h4.innerText = post.title;
    section.appendChild(h4);

    const p = document.createElement("p");
    p.classList.add("post-body");
    p.innerText = post.body;
    section.appendChild(p);

    const hiddenSect = hiddenSection();
    section.appendChild(hiddenSect);

    const commentsArea = hiddenSect.childNodes[1];

    section.addEventListener("mouseenter", (e) => showComments(post.id, commentsArea));

    section.addEventListener("mouseleave", (e) => removeComments(commentsArea));

    return section;
}

const fetchUser = async id => {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (user.ok) {
        const username = await user.json();
        return username.username;
    }
    else return "Unknown"
}

const hiddenSection = () => {
    const hiddenSect = document.createElement("section");
    hiddenSect.classList.add("hidden");

    const commentsHeading = document.createElement("h3");
    commentsHeading.id = "comment-heading";
    commentsHeading.innerText = "Comments"
    hiddenSect.appendChild(commentsHeading);

    const comments = document.createElement("section");
    comments.classList.add("comments");
    hiddenSect.appendChild(comments);

    return hiddenSect;
}

const showComments = async (id, commentsArea) => {
    const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (comments.ok) {
        const allComms = await comments.json();
        for(let comment of allComms){
            const section = createComment(comment);
            commentsArea.appendChild(section);
        }
    }
}

const createComment = comment => {
    const section = document.createElement('section');
    section.classList.add("comment");

    const user = document.createElement("p");
    user.classList.add("commentor-email");
    console.log(comment.email)
    user.innerText = comment.email;
    section.appendChild(user);

    const body = document.createElement("p");
    body.classList.add("comment-body");
    body.innerText = comment.body;
    section.appendChild(body);

    return section;
}

const removeComments = (commentsArea) => {
    for(let comment of commentsArea.childNodes){
        comment.remove();
    }
}
function getPosts(userId) {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
        .then((response) => {
            if (response.ok) {

                return response.json()
            }
        })
        .then((posts) => {

            document.getElementById('posts').innerHTML = "";

            for (post of posts) {
                let content = `
                <div id="post">
                    <h3>${post.title}</h3>
                    <h4>
                        ${post.body}
                    </h4>
                 </div>
                
                `
                document.getElementById('posts').innerHTML += content;
            }
        });

}



function getUsers() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (response.ok) {

                    return response.json()
                }else {
                    reject("error with user request");
                }
            })
            .then((users) => {
                document.getElementById('users').innerHTML = "";

                for (user of users) {
                    let content = `
<div id="user" onclick="userClicked(${user.id} , this)">
<h3>${user.name}</h3>
<h3>${user.email}</h3>
</div>

`
                    document.getElementById('users').innerHTML += content;
                }
                resolve();
            });
    })



}


getUsers().then(() => {
    getPosts(1);
}).catch((error) => {
    console.log(error);
});


function userClicked(id, ele) {
    getPosts(id);

    let selectedElements = document.getElementsByClassName("selected");
    for (element of selectedElements) {
        element.classList.remove("selected");
    }
    ele.classList.add("selected");
}


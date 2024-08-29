   
        function getUsersUsingAxios() {
            return new Promise((resolve, reject) => {
                axios.get('https://jsonplaceholder.typicode.com/users')
                    .then((response) => {
                        let users = response.data;
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
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            })

        }


        function getPostsUsingAxios(userId) {
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then((response) => {
                    let posts = response.data;
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
                })
                .catch((error) => {
                    console.log(error);
                });
        }


        getUsersUsingAxios().then(() => {
             getPostsUsingAxios(1); })
             .catch((error) => { console.log(error);}); 


        function userClicked(id, ele) {
            getPostsUsingAxios(id);

            let selectedElements = document.getElementsByClassName("selected");
            for (element of selectedElements) {
                element.classList.remove("selected");
            }
            ele.classList.add("selected");
        }

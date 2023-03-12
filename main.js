

const postDiv = document.querySelector('.post');
const btn=document.querySelector('.btn')
const form=document.getElementById('signup')

let myId=document.querySelector('.myInput')
myId.addEventListener('input',(e)=>{
    e.preventDefault();
    if(myId.value>100||myId.value<=0){
        e.target.classList.add('error')
        e.target.nextElementSibling.textContent='Try again'
        e.target.nextElementSibling.classList.add('error-text')
    }
    else {
        e.target.classList.remove('error')
        e.target.nextElementSibling.classList.remove('error-text')
        e.target.nextElementSibling.textContent = 'Thanks!'


        const asyncGetPost = async function () {
            try {

                const myPost = myId.value
                const PostResult = await fetch(`https://jsonplaceholder.typicode.com/posts/${myPost}`);
                if (PostResult.ok === false) {
                    throw new Error('Post request failed!');
                }
                const postData = await PostResult.json()
                console.log(postData)
                const postHtml = `
            <h2 class="data_title">${postData.title}</h2>
            <p class="data_paragraph">${postData.body}</p>
            <button class="comments-btn">Get Comments</button>
          `;

                postDiv.innerHTML = postHtml;
                const comments = async function () {

                    try {

                        const myPost = myId.value
                        const commentResult = await fetch(`https://jsonplaceholder.typicode.com/posts/${myPost}/comments`);

                        if (commentResult.ok === false) {
                            throw new Error('Comment request failed!');
                        }
                        const commentData = await commentResult.json()
                        for (i = 0; i < commentData.length; i++) {
                            const div = document.createElement('div')
                            div.classList.add('comment')
                            div.innerHTML = `
                        <h2 class="comment_title">${commentData[i].body}</h2>
                        <p class="comment_paragraph">${commentData[i].email}</p>
                        <p class="comment_paragraph">${commentData[i].name}</p>
                        `
                            postDiv.append(div)
                        }

                    } catch (err) {
                        console.log(`${err}`);
                    }
                }
                const commentBtns = document.querySelector('.comments-btn');
                commentBtns.addEventListener('click', comments);


            } catch (err) {
                console.log(`${err}`);
            }

        }

        asyncGetPost();
    }
})






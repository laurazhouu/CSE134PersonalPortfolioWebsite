export function openNewPost(dialog, blogArr) {
    const updateButton = document.getElementById('addbtn');
    updateButton.addEventListener("click", () => {
        dialog.showModal();
    });
}

export function cancelPost(dialog) {
    const closeButton = document.getElementById('cancelbtn');
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}

export function readFormData() {
    let title = document.getElementById('postTitle').value;
    let sanitizedResult = DOMPurify.sanitize(title);
    let date = document.getElementById('postDate').value;
    let sanitizedResult2 = DOMPurify.sanitize(date);
    let summary = document.getElementById('postSumm').value;
    let sanitizedResult3 = DOMPurify.sanitize(summary);

    let post = {
        "title": sanitizedResult,
        "date": sanitizedResult2,
        "summary": sanitizedResult3
    }
    return post;
}

export function readFormData2() {
    let title = document.getElementById('postTitle2').value;
    let sanitizedResult = DOMPurify.sanitize(title);
    let date = document.getElementById('postDate2').value;
    let sanitizedResult2 = DOMPurify.sanitize(date);
    let summary = document.getElementById('postSumm2').value;
    let sanitizedResult3 = DOMPurify.sanitize(summary);

    let post = {
        "title": sanitizedResult,
        "date": sanitizedResult2,
        "summary": sanitizedResult3
    }
    return post;
}

export function addPost(dialog, blogArr, items) {
    const okButton = document.getElementById('savebtn');
    console.log("addpost entered");

    okButton.addEventListener("click", () => {
        let obj = readFormData();
        let num = Math.random().toString(16).slice(2);
        obj.uuid = num;
        blogArr.push(obj);
        items.push(obj);

        localStorage.setItem("blog-array", JSON.stringify(items));


        redisplayContent(blogArr, obj, num, items);
        dialog.close(dialog);
    });

}

function delPost(blogArr, num, items) {
    console.log("delpost entered");

    let index = -1;
    for (let i = 0; i < blogArr.length; i++) {
        if (blogArr[i].uuid === num) {
            index = i;
        }
    }
    blogArr.splice(index, 1);
    document.getElementById(`blogentry${num}`).remove()

    //

    items.splice(index, 1);
    localStorage.setItem("blog-array", JSON.stringify(items));

    // document.getElementById(`blogentry${num}`).remove()
    console.log(blogArr);
}

function editPost(blogArr, num, dialog, items) {
    console.log('editpost entered');
    dialog.show();

    document.getElementById(`cancelbtn2`).addEventListener('click', () => { dialog.close()});
    const editButton = document.getElementById('savebtn2');
    editButton.addEventListener("click", () => {
        let obj = readFormData2();
        console.log(blogArr);
        dialog.close();

        let editPost = {
            title: obj.title,
            date: obj.date,
            summary: obj.summary,
            uuid: num
        }



        let index = -1;
        for (let i = 0; i < blogArr.length; i++) {
            if (blogArr[i].uuid === num) {
                index = i;
            }
        }

        blogArr[index] = editPost;
        items[index] = editPost;
        localStorage.setItem("blog-array", JSON.stringify(items));

        document.getElementById(`title${num}`).innerHTML = `<h3>${obj.title}</h3>`;
        document.getElementById(`date${num}`).innerHTML = `<h4>${obj.date}</h4>`;
        document.getElementById(`summary${num}`).innerHTML = `<p>${obj.summary}</p>`;
    });
}


function redisplayContent(blogArr, obj, num, items) {
    console.log("redisplay");
    console.log(blogArr);

    let blogEntry = document.createElement('div');
    document.getElementById('blogs').appendChild(blogEntry);
    blogEntry.innerHTML = `<h3 id="title${num}">${obj.title}</h3>
                                <h4 id="date${num}">${obj.date}</h4>
                                <p id="summary${num}">${obj.summary}</p>
                                <button id="button${num}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                              </svg></button>
                                <button id="ebutton${num}">EDIT</button>`;
    blogEntry.id = `blogentry${num}`;

    document.getElementById(`button${num}`).addEventListener("click", () => {
        delPost(blogArr, num, items);
    });

    document.getElementById(`ebutton${num}`).addEventListener("click", () => {
        editPost(blogArr, num, document.getElementById('editPost'), items);
    });

    localStorage.setItem("blog-array", JSON.stringify(items));

}

export function displayAll(items) {
    for (let i = 0; i < items.length; i++) {
        redisplayContent([], items[i], items[i].uuid, items);
    }
}








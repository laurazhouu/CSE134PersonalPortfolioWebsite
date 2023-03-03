export function openNewPost(dialog, blogArr) {
    const updateButton = document.getElementById('addbtn');
    updateButton.addEventListener("click", () => {
        dialog.show();
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
        "date": new Date(sanitizedResult2),
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
        "date": new Date(sanitizedResult2),
        "summary": sanitizedResult3
    }
    return post;
}

export function addPost(dialog, blogArr) {
    const okButton = document.getElementById('savebtn');
    console.log("addpost entered");
    
    okButton.addEventListener("click", () => {
        let obj = readFormData();
        blogArr.push(obj);
        redisplayContent(blogArr, dialog);
        dialog.close(dialog);
    });

}

function delPost(blogArr, i) {
    console.log("delpost entered");
    if (blogArr.length == 1) {
        blogArr.length = 0;
    } else {
        blogArr.splice(i, 1);
    }

    document.getElementById(`blogentry${i}`).remove()
    console.log(blogArr);
}

function editPost(blogArr, i, dialog) {
    console.log('editpost entered');
    dialog.show();
    const editButton = document.getElementById('savebtn2');
    editButton.addEventListener("click", () => {
        let obj = readFormData2();
        console.log(obj);
        dialog.close();
        blogArr[i]['title'] = obj['title'];
        blogArr[i]['date'] = obj['date'];
        blogArr[i]['summary'] = obj['summary'];
        document.getElementById(`title${i}`).innerHTML = `<h3>${blogArr[i]['title']}</h3>`;
        document.getElementById(`date${i}`).innerHTML = `<h4>${blogArr[i]['date']}</h4>`;
        document.getElementById(`summary${i}`).innerHTML = `<p>${blogArr[i]['summary']}</p>`;
    });
}


function redisplayContent(blogArr, dialog) {
    console.log("redisplay");
    console.log(blogArr);

    document.getElementById('blogs').innerHTML = "";
    for (let i = 0; i < blogArr.length; i++) {

        let blogEntry = document.createElement('div');
        document.getElementById('blogs').appendChild(blogEntry);
        blogEntry.innerHTML = `<h3 id="title${i}">${blogArr[i]['title']}</h3>
                                <h4 id="date${i}">${blogArr[i]['date']}</h4>
                                <p id="summary${i}">${blogArr[i]['summary']}</p>
                                <button id="button${i}">DELETE</button>
                                <button id="ebutton${i}">EDIT</button>`;
        blogEntry.id = `blogentry${i}`;

        document.getElementById(`button${i}`).addEventListener("click", () => {
            delPost(blogArr, i);
        });

        document.getElementById(`ebutton${i}`).addEventListener("click", () => {
            editPost(blogArr, i, document.getElementById('editPost'));
        });
    }

}





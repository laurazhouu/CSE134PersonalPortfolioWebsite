export function openNewPost(dialog) {
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

export function addPost(dialog, blogArr) {
    let title = document.getElementById('postTitle').value;
    let sanitizedResult = DOMPurify.sanitize(title);
    let date = document.getElementById('postDate').value;
    let sanitizedResult2 = DOMPurify.sanitize(date);
    let summary = document.getElementById('postSumm').value;
    let sanitizedResult3 = DOMPurify.sanitize(summary);

    const okButton = document.getElementById('savebtn');
    okButton.addEventListener("click", () => {

        let obj = {
            "color": "purple",
            "type": "minivan",
            "registration": new Date('2012-02-03'),
            "capacity": 7
        }

        blogArr.push(obj);
        document.getElementById('blogs').innerHTML = JSON.stringify(blogArr);
        dialog.close();
    });

}
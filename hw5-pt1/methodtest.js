const getFormData = () => {
    return {
        id: document.getElementById('id').value,
        articleName: document.getElementById('article_name').value,
        articleBody: document.getElementById('article_body').value,
    }
}

const post = async () => {
    let result = await fetch('https://httpbin.org/post', { method: 'POST', body: JSON.stringify(getFormData()) })
    result = await result.json();
    result = JSON.stringify(result, null, '\t');
    document.getElementById('response').innerHTML = `<pre>${result}</pre>`;
}

const put = async () => {
    let result = await fetch('https://httpbin.org/put', { method: 'PUT', body: JSON.stringify(getFormData()) })
    result = await result.json();
    result = JSON.stringify(result, null, '\t');
    document.getElementById('response').innerHTML = `<pre>${result}</pre>`;
}

const del = async () => {
    let result = await fetch('https://httpbin.org/delete', { method: 'DELETE', body: JSON.stringify(getFormData()) })
    result = await result.json();
    result = JSON.stringify(result, null, '\t');
    document.getElementById('response').innerHTML = `<pre>${result}</pre>`;
}

document.getElementById('getBtn').addEventListener("click", () => {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://httpbin.org/get', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            document.getElementById('response').innerHTML = `<pre>${request.responseText}</pre>`;
        }
    };
    request.send();
});

document.getElementById('postBtn').addEventListener("click", (event) => {
    event.preventDefault();
    post();
});

document.getElementById('putBtn').addEventListener("click", (event) => {
    event.preventDefault();
    put();
});

document.getElementById('deleteBtn').addEventListener("click", (event) => {
    event.preventDefault();
    del();
});

const d = new Date();
document.getElementById('date').innerHTML = d;

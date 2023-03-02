export function openPrompt(dialog) {
    const promptBtn = document.getElementById('promptbtn');
    promptBtn.addEventListener("click", () => {
        dialog.show();
        output.innerHTML = "";
    })
}

export function closePrompt(dialog) {


    const confirmBtn = document.getElementById('okbtn');
    const cancelBtn = document.getElementById('cancelbtn');
    confirmBtn.addEventListener("click", () => {
        let text = document.getElementById('textVal').value;
        let sanitizedResult = DOMPurify.sanitize(text);

        if (sanitizedResult == "") {
            output.innerHTML = `User didn't enter anything`;
        }
        else {
            output.innerHTML = sanitizedResult;
        }
        dialog.close();

    });

    cancelBtn.addEventListener("click", () => {
        output.innerHTML = `User didn't enter anything`;
        dialog.close();
    });
}

export function openConfirm(dialog) {
    const confirmBtn = document.getElementById('confirmbtn');
    confirmBtn.addEventListener("click", () => {
        dialog.show();
        output.innerHTML = "";
    })
}

export function closeConfirm(dialog) {
    const okBtn = document.getElementById('confirmOk');
    const noBtn = document.getElementById('confirmNo');
    const output = document.getElementById('output');

    okBtn.addEventListener("click", () => {
        dialog.close('ok pressed');
        output.innerHTML = "Confirm result: true";
    })

    noBtn.addEventListener("click", () => {
        dialog.close('cancel pressed');
        output.innerHTML = "Confirm result: false";
    })

}
export function openAlert(dialog) {
    const updateButton = document.getElementById('alertbtn');
    updateButton.addEventListener("click", () => {
        dialog.show();
        openCheck(dialog);
    });
}

export function closeAlert(dialog) {
    const cancelButton = document.getElementById('alertokbtn');
    cancelButton.addEventListener("click", () => {
        dialog.close("ok pressed");
        openCheck(dialog);
    });
}

export function openCheck(dialog) {
    if (dialog.open) {
        console.log("Dialog open");
    } else {
        console.log("Dialog closed");
    }
}
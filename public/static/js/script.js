


window.onload = function () {
    window.imageData = new FormData();
    let textarea = document.querySelectorAll('.textarea')[0];
    document.querySelectorAll('.textarea')[0].addEventListener('paste', handlePaste);
    document.querySelectorAll('.textarea')[0].addEventListener('keypress', handleEnter);
    document.querySelectorAll('.comment-btn')[0].addEventListener('click', sendMsg);

    function handlePaste(e) {
        let clipboardData;
        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        var items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (index in items) {
            let item = items[index];
            if (item.kind === 'file') {
                let blob = item.getAsFile();
                let reader = new FileReader();
                window.imageData.append('fname', blob.name);
                window.imageData.append('data', blob);
                let img = document.createElement('div');
                img.classList.add('img-attached');
                img.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
                let dBtn = document.createElement('button');
                dBtn.classList.add('d-img-attached');
                dBtn.classList.add('d-img');
                img.appendChild(dBtn);
                let commentContainer = document.querySelector('.comment-wrapper');
                commentContainer.insertBefore(img, commentContainer.firstChild);
                document.querySelectorAll('.d-img-attached')[0].addEventListener('click', deleteImage);
            }
        }
    }

    function handleEnter(e) {
        if (e.keyCode == 13) {
            document.querySelector('.comment-btn').click();
        }
    }

    function sendMsg(e) {
        e.stopPropagation();
        e.preventDefault();

        // Call API Here
        fetch('/api/postimage',
            {
                method: 'POST',
                body: window.imageData
            }).then(function (res) {
                console.log(res);
            });
        document.querySelectorAll('.d-img-attached')[0].click();
    }

    function deleteImage(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.parentElement.remove()
    }
};

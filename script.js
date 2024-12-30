document.addEventListener('DOMContentLoaded' , () => {         //ensures that the JavaScript code inside the callback function runs only after the entire HTML document has been fully loaded and parsed by the browser.
    const form = document.getElementById('bookmark-form');
    const bookmarkList = document.getElementById('bookmark-list');

    // Load bookmarks from localStorage : 

    const loadBookmarks = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarkList.innerHTML = '';
        bookmarks.forEach((bookmark , index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            bookmarkList.appendChild(li);
        });
    };

    // Save a New Bookmark : 
    form.addEventListener('submit' , (e) => {
        e.preventDefault();      //used to stop the default action of the form submission in this code. (To prevent the refreshing of the browser . )

        const name = document.getElementById('website-name').value.trim();
        const url = document.getElementById('website-url').value.trim();

        if(!name || !url) {
            alert('Please provide both a name and a valid url');
            return;
        }

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push({name , url});
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));

        form.reset();
        loadBookmarks();
    });


    // Delete a Bookmark : 
    bookmarkList.addEventListener('click' , (e) => {
        if(e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            bookmarks.splice(index , 1);
            localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
            loadBookmarks();
        }
    });

    loadBookmarks();
});
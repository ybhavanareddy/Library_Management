let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResultBooks(result) {
    let {
        author,
        imageLink,
        title
    } = result;

    let bookEl = document.createElement("div");
    bookEl.classList.add("book");

    let bookImageEl = document.createElement("img");
    bookImageEl.src = imageLink;
    bookImageEl.classList.add("book-image");
    bookEl.appendChild(bookImageEl);

    let bookTitleEl = document.createElement("h3");
    bookTitleEl.textContent = title;
    bookTitleEl.classList.add("book-title");
    bookEl.appendChild(bookTitleEl);

    let bookAuthorEl = document.createElement("p");
    bookAuthorEl.textContent = author;
    bookAuthorEl.classList.add("book-author");
    bookEl.appendChild(bookAuthorEl);

    searchResultsEl.appendChild(bookEl);



}


function displayresults(search_results) {
    searchResultsEl.textContent = "";
    if (search_results.length === 0) {
        searchResultsEl.textContent = "No Results Found";
    } else {
        for (let result of search_results) {
            createAndAppendResultBooks(result);
        }
    }

}

function searchBooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(jsonData);
                displayresults(search_results);
                spinnerEl.classList.add("d-none");
            });
    }
}
searchInputEl.addEventListener("keydown", searchBooks);
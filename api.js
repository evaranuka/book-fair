// default hide number of data
document.getElementById("found-data").style.display = "none";

// load data
const loadData = () => {
  const textInput = document.getElementById("textInput");
  const searchValue = textInput.value;

  // hide old search history
  textInput.value = "";

  // show spinner
  document.getElementById("spinner").classList.add("spinner-style");
  document.getElementById("spinner").classList.remove("spinner");

  // hide old search-content
  document.getElementById("search-content").style.display = "none";

  // hide old number of data
  document.getElementById("found-data").style.display = "none";

  // fetch data
  const url = `https://openlibrary.org/search.json?q=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.docs, data.numFound));
};

// display data
const displayData = (books, results) => {
  //  number of data formation
  const foundData = document.getElementById("found-data");
  foundData.textContent = "";
  const foundNumber = document.createElement("h3");
  foundNumber.innerText = `Showing ${books.length} books out of ${results} results`;
  foundData.appendChild(foundNumber);

  // hide old row content
  const row = document.getElementById("row-div");
  row.textContent = "";

  // for each book formation
  books.forEach((book) => {
    // whether source url exists or not
    const sourceUrl = () => {
      if (book.cover_i) {
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      } else {
        return "images/image.jpg";
      }
    };
    const returendSourceUrl = sourceUrl();
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `<div class="card h-100 rounded dark">
    <img  src=${returendSourceUrl}  class="card-img-top" alt="..." style='height: 360px; padding: 15px; border: 1px solid #003366'/> 
        <div class="card-body">
          <h4 class="card-title">Book-name : ${
            book.title ? book.title : "Not found"
          }</h4><br>
          <h5 class="card-title">Author-name : ${
            book.author_name ? book.author_name : "Not found"
          }</h5><br>
          <h5 class="card-title">Publisher : ${
            book.publisher ? book.publisher : "Not found"
          }</h5><br>
          <h5 class="card-title">First-published : ${
            book.first_publish_year ? book.first_publish_year : "Not found"
          }</h5>
        </div>
    </div>`;
    row.appendChild(col);
  });

  // hide spinner
  document.getElementById("spinner").classList.add("spinner");
  document.getElementById("spinner").classList.remove("spinner-style");

  // show search-content
  document.getElementById("search-content").style.display = "block";

  // show number of data
  document.getElementById("found-data").style.display = "block";
};
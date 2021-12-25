class Book {
    constructor(title, author, isbn) {
        this.title = title; 
        this.author = author; 
        this.isbn = isbn;
    }
} 


class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Create tr element 
        const row = document.createElement('tr'); 
        // insert cols 
        row.innerHTML= `<td>${book.title}</td> 
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>` ; 

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div 
        const div = document.createElement('div'); 
        //add classes 
        div.className = `alert ${className}` ; 
        // add text 
        div.appendChild(document.createTextNode(message)); 
        // get parent 
        const container = document.querySelector('.container'); 
        // get form
        const form = document.querySelector('#book-form'); 
        // insert alert
        container.insertBefore(div, form);

        // Timout after 3 seconds 
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    } 

    deleteBook(e) {
    if(e.target.innerHTML ==='X') {
        e.target.parentElement.parentElement.remove();
    }

    } 

    clearFields() {
        document.getElementById('title').value = ''; 
        document.getElementById('author').value = ''; 
        document.getElementById('isbn').value = ''; 
    }
}



    // event Listeners 
    document.getElementById('book-form').addEventListener('submit', function(e) {
    
        //get form values
    const title = document.getElementById('title').value;
    const author= document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // create a book object
    const book = new Book(title, author,isbn); 

    //Instantiate UI

    const ui = new UI(); 



    //validate 
    if(title === '' || author==='' || isbn==='') {
        // Error Alert 
        ui.showAlert('Please fill in all fields', 'error');
        
    } else {
        // Add book to list 
        ui.addBookToList(book);  

        // Add to LS
        Store.addBook(book);

        ui.showAlert('Book Added', 'success')

        ui.clearFields();


        ui.deleteBook(e);
    }

    e.preventDefault();
}); 


document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI(); 

    ui.deleteBook(e); 
    ui.showAlert('Book Deleted', 'delete-book'); 

     // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});



// ************************* //
// LOCAL STORATE 


class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
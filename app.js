//Book Constructor
function Book(title, author, isbn) {
    this.title = title; 
    this.author = author; 
    this.isbn = isbn; 
}


// UI Constructor 
function UI() {

} 


UI.prototype.addBookToList = function(book) {
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

// delete book  
//dikos mou tropos
// UI.prototype.deleteBook = function () { 
//     // get the parent element
//     const bookList = document.querySelector('#book-list'); 
//     const ui = new UI();
//     // add event on the parent element
//     bookList.addEventListener('click', function(e) { 
//         //check if X was clicked!
//         if(e.target.innerHTML === 'X') {
//             e.target.parentElement.parentElement.remove();
        
//             ui.showAlert('Book Deleted', 'delete-book')
  
//         } 
//     })
     
// } 

// delete book 
UI.prototype.deleteBook = function(e) {
    if(e.target.innerHTML ==='X') {
        e.target.parentElement.parentElement.remove();
    }
}


// clear fields 
UI.prototype.clearFields = function() {
    document.getElementById('title').value = ''; 
        document.getElementById('author').value = ''; 
            document.getElementById('isbn').value = ''; 
}

// Show alert
UI.prototype.showAlert = function(message, className) {
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



// event Listeners 
document.getElementById('book-form').addEventListener('submit', function(e) {
    //get form values
    const title = document.getElementById('title').value, 
            author= document.getElementById('author').value, 
            isbn = document.getElementById('isbn').value;

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

        ui.showAlert('Book Added', 'success')

        ui.clearFields();


        ui.deleteBook();
    }

    e.preventDefault();
}); 


document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI(); 

    ui.deleteBook(e); 
    ui.showAlert('Book Deleted', 'delete-book');

    e.preventDefault();
})

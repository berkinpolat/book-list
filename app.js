function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = (book) => {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showMessage = (message, type) => {
    const alert = document.getElementById('alert');
    console.log(alert)
    if (alert == null || alert.className === 'alert success') {
        const div = document.createElement('div');
        div.id='alert';
        if (type === 'error') {
            div.className = 'alert error';
        } else {
            div.className = 'alert success';
        }
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }
        , 3000);
    }
    
}

document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showMessage('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        ui.showMessage('Book added', 'success');
        ui.clearFields();
    }
    
    e.preventDefault();
}
);

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    if (e.target.className === 'delete') {
        ui.showMessage('Book removed', 'success');
        e.target.parentElement.parentElement.remove();
    }
}
);
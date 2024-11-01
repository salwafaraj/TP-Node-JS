import { Book, BookFormat } from './Book';

const form = document.getElementById('bookForm') as HTMLFormElement;
const bookList = document.getElementById('bookList') as HTMLElement;

// Load existing books from Local Storage when the application starts
loadBooksFromLocalStorage();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const pages = parseInt((document.getElementById('pages') as HTMLInputElement).value);
    const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;
    const status = (document.getElementById('status') as HTMLSelectElement).value;

    const newBook = new Book(title, author, pages, BookFormat.Print, suggestedBy);

    addBookToList(newBook, status);
    saveBookToLocalStorage(newBook, status);
    form.reset();
});

function addBookToList(book: Book, status: string): void {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages.toString();

    const suggestedByCell = document.createElement('td');
    suggestedByCell.textContent = book.suggestedBy;

    const statusCell = document.createElement('td');
    statusCell.textContent = status;

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(suggestedByCell);
    row.appendChild(statusCell);

    bookList.appendChild(row);
}

function saveBookToLocalStorage(book: Book, status: string): void {
    // Retrieve existing books from Local Storage
    const books = JSON.parse(localStorage.getItem('books') || '[]');

    // Add the new book to the array
    books.push({
        title: book.title,
        author: book.author,
        pages: book.pages,
        suggestedBy: book.suggestedBy,
        status: status
    });

    // Save the updated books array back to Local Storage
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooksFromLocalStorage(): void {
    const books = JSON.parse(localStorage.getItem('books') || '[]');

    // Loop through the stored books and add them to the table
    books.forEach((book: { title: string; author: string; pages: number; suggestedBy: string; status: string; }) => {
        addBookToList(book, book.status);
    });
}

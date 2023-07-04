import BooktCard from '../cards/booksCard';

export default function BooksList({ books }) {
  return (
    <>
      {books.map((book) => (
        <BooktCard book={book}  key={book.id} />
      ))}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from "../services/queries";
import _ from "lodash";

const Books = (props) => {
  const all_books = useQuery(ALL_BOOKS, { pollInterval: 2000 });
  const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (all_books.data) {
      setBooks(all_books.data.allBooks);
      setGenres(_.uniq(all_books.data.allBooks.map((b) => b.genres).flat()));
    }
  }, [all_books]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (all_books.loading) {
    return <div>loading...</div>;
  }

  const handleGenreButtonClick = (event) => {
    console.log(event.target.value);
    getBooks({
      variables: {
        genre: event.target.value,
      },
    });
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} value={g} onClick={handleGenreButtonClick}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;

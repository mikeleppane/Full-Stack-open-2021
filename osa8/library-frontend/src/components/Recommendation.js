import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_BOOKS_BY_GENRE, GET_USER } from "../services/queries";

const Recommendation = (props) => {
  const user = useQuery(GET_USER);
  const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE, {
    pollInterval: 2000,
  });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user.data) {
      getBooks({
        variables: {
          genre: user.data.me.favoriteGenre,
        },
      });
    }
  }, [user, getBooks]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre{" "}
        <strong>{user.data.me.favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommendation;

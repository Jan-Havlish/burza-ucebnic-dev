import { useState, useEffect } from "react";
import { kategorie } from "../data/kategore";
import { useUser } from "./UserContext";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import ShowBooks from "./ShowBooks";

import getDocumentsByFieldValue from "../functions/getDocumentsByFieldValue";

const MyBooks = () => {
  const user = useUser();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    // vždy se změnou uživatele se změní
    kategorie.forEach((kategorie) => {
      getDocumentsByFieldValue(
        kategorie,
        "owner",
        user.displayName,
        books,
        setBooks,
      );
    });
  }, [user]);

  console.log(books);
  return (
    <>
      {user && (
        <>
          <h5 style={{ marginLeft: "16px", marginTop: "16px" }}>
            Moje učebnice
          </h5>
          <ShowBooks books={books} shortMode={true} />
        </>
      )}
    </>
  );
};

export default MyBooks;

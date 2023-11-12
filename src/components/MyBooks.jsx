import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { kategorie } from "../data/kategore";
import { useUser } from "./UserContext";

import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import ShowBooks from "./ShowBooks";

const MyBooks = () => {
  const user = useUser();

  const [books, setBooks] = useState([]);

  async function getDocumentsByFieldValue(
    collection_name,
    fieldName,
    fieldValue
  ) {
    const q = query(
      collection(projectFirestore, collection_name),
      where(fieldName, "==", fieldValue)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const docObject = {
        ...doc.data(),
        id: doc.id,
        kategorie: collection_name,
      };
      setBooks((books) => [...books, docObject]);
    });
  }

  useEffect(() => {
    kategorie.forEach((kategorie) => {
      getDocumentsByFieldValue(kategorie, "owner", user.displayName);
    });
  }, [user]);

  console.log(books);
  return (
    <>
      {user && (
        <>
          <h5 style={{ marginLeft: "16px", marginTop: "16px" }}>Moje učebnice</h5>
          <ShowBooks books={books} shortMode={true}/>
        </>
      )}
    </>
  );
};

export default MyBooks;

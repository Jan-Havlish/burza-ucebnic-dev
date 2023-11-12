import React, { useState, useEffect } from "react";
import SchoolBook from "./schoolBook";

import compareByTimeStamp from "../functions/compareByTimeStamp";

import { projectFirestore } from "../firebase/config";
import { doc, collection } from "firebase/firestore";
import { query, orderBy, limit, getDocs } from "firebase/firestore";

import { useUser } from "../components/UserContext";


const ShowBooks = (props) => {
  const user = useUser();

  const [booksWithUnrespondedComments, setBooksWithUnrespondedComments] =
    useState([]);

  const getNewestDocument = async (collectionRef, conversationID) => {
    const q = query(collectionRef, orderBy("timeStamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  };

  const addUnrespondedBooks = async (books) => {
    books.forEach(async (book) => {
      console.log(book, "book");
      const conversationID = book.id;

        const conversationRef = doc(
        projectFirestore,
        "konverzace",
        `${conversationID}`
      );
      const messagesRef = collection(conversationRef, "messages");

      const newestDocument = await getNewestDocument(messagesRef, conversationID);
      console.log(newestDocument, "newestDocument");
      
      if (!newestDocument) {
        return;
      }
      const autorOfNewestDocument = newestDocument.autor
      console.log(autorOfNewestDocument, "autorOfNewestDocument");

      if (autorOfNewestDocument !== user.email) {
        setBooksWithUnrespondedComments(...booksWithUnrespondedComments, book.id);
      }
    });
  };

  useEffect(() => {
    addUnrespondedBooks(props.books);
  }, [props.books]);

  console.log(props, "ShowBooks");
  const bookCards = props.books.map((book) => (
    <>
      {console.log(booksWithUnrespondedComments, "booksWithUnrespondedComments")}

      <SchoolBook
        key={book.id}
        {...book}
        shortMode={props.shortMode}
        unReadComments={
          booksWithUnrespondedComments.includes(book.id) ? true : false
        }
        isMyBook={book.owner === user.displayName ? true : false}
      />
    </>
  ));

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {bookCards}
    </div>
  );
};

export default ShowBooks;

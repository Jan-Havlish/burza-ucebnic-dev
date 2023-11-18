import { useUser } from "../components/UserContext";
import { kategorie } from "../data/kategore";
import getMessagesByAuthor from "./getMessagesByAuthor";

import getDocumentsByFieldValue from "./getDocumentsByFieldValue";

const findAllMyBooks = async (myEmail, books, setBooks, categories) => {
  categories.forEach(async (category) => {
    const book = await getDocumentsByFieldValue(
      category,
      "ownerEmail",
      myEmail,
      books,
      setBooks,
    );
  });

  return "done";
};
const downloadMyActivity = (books, setBooks, myMessages, setMyMessages) => {
  console.log("click");
  console.log(findAllMyBooks("test6@test.test", books, setBooks, kategorie));
  console.log(
    getMessagesByAuthor("test6@test.test", setMyMessages),
    "od autora",
  );
};

export default downloadMyActivity;

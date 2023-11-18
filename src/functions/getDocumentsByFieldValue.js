import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

async function getDocumentsByFieldValue(
  collection_name,
  fieldName,
  fieldValue,
  books,
  setBooks,
) {
  const q = query(
    collection(projectFirestore, collection_name),
    where(fieldName, "==", fieldValue),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots, takže netřeba ošetřovat
    const docObject = {
      ...doc.data(),
      id: doc.id,
      kategorie: collection_name,
    };
    setBooks((books) => [...books, docObject]);
  });
}

export default getDocumentsByFieldValue;

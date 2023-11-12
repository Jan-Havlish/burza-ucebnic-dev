import { projectFirestore } from '../firebase/config'
import { doc, getDoc } from "firebase/firestore";

const getDocumentById = async (collectionName, id) => {
  try {
    const docRef = doc(projectFirestore, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export default getDocumentById
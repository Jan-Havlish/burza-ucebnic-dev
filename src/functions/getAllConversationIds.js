import { projectFirestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

async function getAllConversationIds() {
  const conversationsCollection = collection(projectFirestore, "konverzace");
  const querySnapshot = await getDocs(conversationsCollection);

  // Získáme seznam ID přímo z dotazu
  const conversationIds = querySnapshot.docs.map((doc) => doc.id);

  return conversationIds;
}

export default getAllConversationIds;

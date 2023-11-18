import {
  collection,
  doc,
  collectionGroup,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const getMessagesFromConversation = (conversationID, setMessages, compare) => {
  console.log("getMessagesFromConversation", conversationID);
  const conversationRef = doc(
    projectFirestore,
    "konverzace",
    `${conversationID}`,
  );
  const messagesRef = collection(conversationRef, "messages");
  onSnapshot(messagesRef, (snapshot) => {
    let updatedMessages = [];
    snapshot.forEach((doc) => {
      updatedMessages.push(doc.data());
    });

    updatedMessages.sort(compare);

    setMessages(updatedMessages);
    return updatedMessages;
  });
};

export default getMessagesFromConversation;

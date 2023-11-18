import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import compareByTimeStamp from "./compareByTimeStamp";

import getAllConversationIds from "./getAllConversationIds";
import getMessagesFromConversation from "./getMessagesFromConversation";

async function getMessagesByAuthor(author, setMyMessages) {
  const allIDs = await getAllConversationIds();

  let messages = [];
  allIDs.forEach(async (oneID) => {
    const test = await getMessagesFromConversation(
      oneID,
      setMyMessages,
      compareByTimeStamp,
    );
    messages.push(test);
  });
  setMyMessages(messages);

  console.log(messages, "ať to funguje");
}

export default getMessagesByAuthor;

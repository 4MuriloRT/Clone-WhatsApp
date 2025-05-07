import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  onSnapshot
} from "firebase/firestore";

import firebaseConfig from './firebaseConfig';

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  googlePopup: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Erro ao logar com o Google:", error);
      return null;
    }
  },

  addUser: async (u) => {
    const userRef = doc(db, "users", u.id);
    await setDoc(userRef, {
      name: u.name,
      avatar: u.avatar
    }, { merge: true });
  },

  getContactList: async (userId) => {
    let list = [];
    const usersCollection = collection(db, "users");
    const results = await getDocs(usersCollection);

    results.forEach((result) => {
      let data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar
        });
      }
    });

    return list;
  },

  addNewChat: async (user, user2) => {
    // Cria nova conversa
    const chatRef = await addDoc(collection(db, "chats"), {
      messages: [],
      users: [user.id, user2.id]
    });

    // Atualiza o usuário 1
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      chats: arrayUnion({
        chatId: chatRef.id,
        title: user2.name,
        image: user2.avatar,
        with: user2.id
      })
    });

    // Atualiza o usuário 2
    const user2Ref = doc(db, "users", user2.id);
    await updateDoc(user2Ref, {
      chats: arrayUnion({
        chatId: chatRef.id,
        title: user.name,
        image: user.avatar,
        with: user.id
      })
    });
  },
  onChatList: (userId, setChatList) => {
    const userDoc = doc(db, "users", userId);
    return onSnapshot(userDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data.chats) {
          let chats = [...data.chats];
          chats.sort((a, b) => {
            if (!a.lastMessageDate) return 1;
            if (!b.lastMessageDate) return -1;
            return b.lastMessageDate.seconds - a.lastMessageDate.seconds;
          });
          setChatList(chats); // Corrigido aqui
        }
      }
    });
  },
  onChatContent: (chatId, setList, setUsers) =>{
    const userDoc = doc(db, 'chats' , chatId);
    return onSnapshot(userDoc,(docSnapshot) => {
        if(docSnapshot.exists()){
          const data = docSnapshot.data();
          if(data.messages){
            setList(data.messages);
            setUsers(data.users);
          }else{
            setList([]);
          }
        }
    });
  },
  sendMessage: async (chatData, userId, type, body, users) => {
    const chatRef = doc(db, 'chats', chatData.chatId);
    const now = new Date();
  
    // Atualiza a coleção de mensagens no chat
    await updateDoc(chatRef, {
      messages: arrayUnion({
        type,
        author: userId,
        body,
        date: now
      })
    });
  
    // Atualiza os dados de cada usuário
    for (let i in users) {
      const userRef = doc(db, 'users', users[i]);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const uData = userSnap.data();
  
        if (uData.chats) {
          let chats = [...uData.chats];
          let chatChanged = false;
  
          for (let e in chats) {
            if (chats[e].chatId === chatData.chatId) {
              chats[e].lastMessage = body;
              chats[e].lastMessageDate = now;
              chatChanged = true;
            }
          }
  
          if (chatChanged) {
            await updateDoc(userRef, {
              chats: chats
            });
          }
        }
      }
    }
  }
};

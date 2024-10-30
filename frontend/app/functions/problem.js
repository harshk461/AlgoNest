import { firestore } from "@/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { joinQuestion } from "./Utils";

function generateUniqueID() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export const addProblem = async (question) => {
  const uniqueID = generateUniqueID();
  const questionWithID = {
    id: uniqueID,
    ...question,
  };

  try {
    const questionRef = doc(firestore, "problems", uniqueID);
    await setDoc(questionRef, questionWithID);
    console.log("Question added successfully!");
  } catch (error) {
    console.error("Error adding question:", error);
  }
};

export const getAllProblems = async () => {
  const problemsRef = collection(firestore, "problems");

  try {
    const querySnapshot = await getDocs(problemsRef);
    const problems = [];

    querySnapshot.forEach((doc) => {
      problems.push({ id: doc.id, ...doc.data() });
    });

    return problems;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return [];
  }
};

export const getProblem = async (question) => {
  const joinedQuestion = joinQuestion(question);
  console.log(joinedQuestion);
  const problemsRef = collection(firestore, "problems");
  const q = query(problemsRef, where("question", "==", joinedQuestion));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const problemData = querySnapshot.docs[0].data();
    return problemData;
  } else {
    return null;
  }
};

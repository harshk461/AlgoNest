import { auth, provider } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; // Ensure collection and addDoc are imported
import { firestore } from "../../firebase/firebase"; // Import your firestore instance

export const authenticateUser = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // Step 1: Sign in the user with Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Step 2: Get user information
    const userName = user.displayName;
    const userEmail = user.email;

    // Step 3: Create a user entry in Firestore
    const userRef = doc(firestore, "users", user.uid); // Using user UID as the document ID
    await setDoc(userRef, {
      name: userName,
      email: userEmail,
      createdAt: new Date(),
    });

    // Step 4: Create the sheets collection with initial data
    const initialSheets = [
      {
        id: "sheet1",
        questions: [
          {
            id: "q1",
            question: "What is the longest increasing subsequence?",
            difficulty: "Medium",
            isStarred: false,
            topic: "arrays",
          },
          {
            id: "q2",
            question: "How do you find the shortest path in a graph?",
            difficulty: "Hard",
            isStarred: false,
            topic: "dynamic programming",
          },
        ],
      },
    ];

    const sheetsCollectionRef = collection(userRef, "sheets"); // Create a reference to the sheets collection under the user
    for (const sheet of initialSheets) {
      const sheetDocRef = doc(sheetsCollectionRef); // Create a new document reference in the sheets collection
      await setDoc(sheetDocRef, sheet); // Set the document data
    }

    console.log("User authenticated and data saved successfully");
  } catch (error) {
    console.error("Error during authentication or Firestore update:", error);
  }
};

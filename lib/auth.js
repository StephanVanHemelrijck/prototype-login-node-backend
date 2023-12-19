const { firestore, auth } = require("./firebase");
const {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
} = require("firebase/firestore");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const registerUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential) {
      // Add new collection to Firestore
      const { uid } = userCredential.user;

      // Assign random role to user (tank, healer, dps)
      const roles = [
        {
          name: "Tank",
          description:
            "Tanks are front-line heroes designed to absorb damage, create space, and protect their teammates.",
        },
        {
          name: "Support",
          description:
            "Support heroes are responsible for healing and providing utility to their teammates, enhancing team survivability.",
        },
        {
          name: "DPS",
          description:
            "DPS heroes are focused on dealing damage to opponents, eliminating enemies, and securing kills.",
        },
      ];

      const randomRole = roles[Math.floor(Math.random() * roles.length)];

      console.log(randomRole);

      const collRef = collection(firestore, "users");
      const result = await addDoc(collRef, {
        uid,
        username,
        email,
        created_at: Date.now(),
        role: randomRole,
      });

      return result;
    } else throw new Error("Failed to register user!");
  } catch (err) {
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential) {
      return userCredential;
    } else throw new Error("Failed to login user!");
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("email", "==", email));

    const userSnap = await getDocs(q);

    let user = {};
    userSnap.forEach((doc) => {
      user = { ...doc.data() };
    });

    return user ? user : new Error("User not found!");
  } catch (err) {
    throw err;
  }
};

const getUserByUID = async (uid) => {
  try {
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("uid", "==", uid));

    const userSnap = await getDocs(q);

    let user = {};
    userSnap.forEach((doc) => {
      user = { ...doc.data() };
    });

    return user ? user : new Error("User not found!");
  } catch (err) {
    throw err;
  }
};

module.exports = { registerUser, loginUser, getUserByEmail, getUserByUID };

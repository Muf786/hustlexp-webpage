// src/components/firebase/waitlist.js
import { db } from "./config";
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, increment } from "firebase/firestore";

// Saves a user to the waitlist.
export async function addToWaitlist({
  email,
  name = "",
  phone = "",
  source = "unknown",
  referral_code = "",
  referred_by = ""
}) {
  if (!email) throw new Error("Email is required");

  const ref = collection(db, "waitlist");

  // If there is a referrer, verify and reward them
  if (referred_by) {
    try {
      const q = query(ref, where("referral_code", "==", referred_by));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const referrerDoc = querySnapshot.docs[0];
        await updateDoc(referrerDoc.ref, {
          xp: increment(25),
          referral_count: increment(1)
        });
      }
    } catch (err) {
      console.error("Error rewarding referrer:", err);
      // Continue with signup even if referral logic fails silently
    }
  }

  return await addDoc(ref, {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    phone: phone.trim(),
    source,
    referral_code,
    referred_by,

    // XP System
    xp: 100, // Starting XP
    badges: ["Real OG"],
    referral_count: 0,

    createdAt: serverTimestamp()
  });
}

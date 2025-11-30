// src/components/firebase/waitlist.js
import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

  return await addDoc(ref, {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    phone: phone.trim(),
    source,
    referral_code,
    referred_by,

    // XP System
    xp: 100,
    badges: ["Real OG"],

    createdAt: serverTimestamp()
  });
}

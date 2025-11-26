// src/firebase/waitlist.js
import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function addToWaitlist({ email, name, source, referral_code, referred_by, phone }) {
  const ref = collection(db, "waitlist");

  return await addDoc(ref, {
    email: email.trim().toLowerCase(),
    name: name?.trim() || "",
    phone: phone?.trim() || "",
    source: source || "unknown",
    referral_code: referral_code || "",
    referred_by: referred_by || "",
    xp: 100,
    badges: ["Real OG"],
    createdAt: serverTimestamp()
  });
}

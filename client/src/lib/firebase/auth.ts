import { auth } from "@/lib/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  // firebase user
  const user = result.user;

  // firebase id token
  const token = await user.getIdToken();

  return { user, token };
};

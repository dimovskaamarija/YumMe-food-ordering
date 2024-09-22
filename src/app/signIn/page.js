"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/firebase/firebaseConfig";
import { firestore } from "/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [userRole, setUserRole] = useState("");
    const router = useRouter();

    const signIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log(userData)
                setUserRole(userData.role);
            }
            router.push("/");
        } catch (error) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                router.push("/signUp");
            }, 3000);
        }
    };

    return (
        <div>
            <h1
                style={{
                    marginLeft: "100px",
                    color: "#f58e4f",
                    marginTop: "30px",
                    marginBottom: "30px",
                }}
            >
                Log In
            </h1>

            <form
                onSubmit={signIn}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "300px",
                    textAlign: "justify",
                    marginLeft: "100px",
                }}
            >
                <label>Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    style={{ height: "30px" }}
                    required
                />

                <label>Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    style={{ height: "30px" }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        width: "70px",
                        padding: "10px",
                        margin: "7px",
                        backgroundColor: "#f58e4f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "400px",
                    }}
                >
                    Log in
                </button>
            </form>

            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        padding: "20px",
                        backgroundColor: "white",
                        border: "1px solid #f58e4f",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        color: "#f58e4f",
                    }}
                >
                    <h1>There is no account associated with this email. Sign up first!</h1>
                </div>
            )}
        </div>
    );
}

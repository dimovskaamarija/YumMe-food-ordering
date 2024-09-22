"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "/firebase/firebaseConfig";
import { firestore } from "/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setRole(event.target.value);
    };

    const signUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(firestore, "users", user.uid), {
                name,
                surname,
                address,
                phone,
                role: selectedOption
            });
            router.push("/signIn");
        } catch (error) {
            console.log(error.message);
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
                Sign Up
            </h1>

            <div
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

                 <label>Name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    style={{ height: "30px" }}
                />
                <label>Surname</label>
                <input
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    style={{ height: "30px" }}
                />
                <label>Address</label>
                <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    style={{ height: "30px" }}
                />
                <label>Phone Number</label>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    style={{ height: "30px" }}
                />
                <label>User role</label>
                <div>
                    <input
                        type="radio"
                        id="Admin"
                        name="role"
                        value="Admin"
                        checked={selectedOption === "Admin"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="Admin">Admin</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="User"
                        name="role"
                        value="User"
                        checked={selectedOption === "User"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="User">User</label>
                </div>

                <button onClick={signUp}
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
                        }}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

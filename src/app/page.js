'use client'; //client side rendering

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./page.module.css"; // Import css module for styling

export default function Home() {
  const router = useRouter(); 

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to Your Todo List</h1>
        <p>Organize your tasks and stay productive!</p>
        <button onClick={() => router.push("./Todo")}>Get Started</button>
      </main>
    </div>
  );
}
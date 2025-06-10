"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email && senha) {
      localStorage.setItem("auth", "true");
      router.push("/");
    } else {
      setErro("Preencha e-mail e senha.");
    }
  }

  return (
    <main className={styles.loginMain}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Login</h1>
        <label htmlFor="email" className={styles.loginLabel}>E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.loginInput}
          placeholder="Digite seu e-mail"
        />
        <label htmlFor="senha" className={styles.loginLabel}>Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className={styles.loginInput}
          placeholder="Digite sua senha"
        />
        <button type="submit" className={styles.loginButton}>Entrar</button>
        {erro && <div className={styles.loginError}>{erro}</div>}
      </form>
    </main>
  );
}

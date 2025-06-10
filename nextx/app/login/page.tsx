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
    // Simulação: qualquer email/senha não vazios são aceitos
    if (email && senha) {
      // Simula login e redireciona para a home
      router.push("/");
    } else {
      setErro("Preencha e-mail e senha.");
    }
  }

  return (
    <main className={styles.loginMain}> {/* Assumindo que login.module.css define .loginMain */}
      <form onSubmit={handleLogin} className={styles.loginForm}> {/* e .loginForm, etc. */}
        <h1 className={styles.loginTitle}>Login</h1>
        <label htmlFor="email" className={styles.loginLabel}>E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.loginInput}
          placeholder="Digite seu e-mail"
          title="Digite seu e-mail"
        />
        <label htmlFor="senha" className={styles.loginLabel}>Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className={styles.loginInput}
          placeholder="Digite sua senha"
          title="Digite sua senha"
        />
        {erro && <div className={styles.loginError}>{erro}</div>}
        <button type="submit" className={styles.loginButton}>Entrar</button>
      </form>
    </main>
  );
}

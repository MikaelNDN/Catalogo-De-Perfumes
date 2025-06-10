"use client";// Em app/page.tsx
import styles from './page.module.css';

/* Removido export default function HomePage duplicado */

import { useState, useEffect } from "react"; // useEffect não será mais necessário para buscar dados locais
import Image from "next/image";
import { useRouter } from "next/navigation";
import { perfumes as perfumesData } from "./produtos/[id]/perfumes"; // Importa os perfumes locais e o tipo Perfume

export default function Home() {
  const router = useRouter();
  // Inicializa o estado 'produtos' com os dados dos perfumes locais.
  // Renomeado para 'perfumesListados' para evitar confusão com a variável 'perfumesData' importada,
  // ou podemos simplesmente usar 'perfumesData' diretamente no map se não houver intenção de modificá-lo.
  // Para manter a estrutura com useState, usaremos 'perfumesListados'.
  const [perfumesListados, setPerfumesListados] = useState(perfumesData);
  const [destaque, setDestaque] = useState<number | null>(null); // 'destaque' parece ser um índice. setDestaque() não é chamado.

  // O useEffect para buscar dados da API externa foi removido.

  const produtoAtual = destaque !== null && perfumesListados[destaque] ? perfumesListados[destaque] : null;

  return (
    <div className={styles.catalogWrapper}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <h1>MCosmeticos</h1>
        </div>
        <button className={styles.authBtn}>Perfil</button>
      </header>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/fundo.jpg" alt="Banner fundo" fill priority style={{ objectFit: 'cover', zIndex: 0 }} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>Catálogo de Perfumes</h1>
            <form className={styles.searchForm}>
              <input type="text" placeholder="O que está procurando?" />
              <button type="submit" className={styles.searchBtn} aria-label="Buscar">🔍</button>
            </form>
          </div>
        </div>
      </section>
      <main className={styles.mainContent}>
        <section className={styles.brandSection}>
          <div className={styles.brandHeaderRow}>
            <h2>Perfumes</h2>
            <div className={styles.productRow}>
              {perfumesListados.map((perfume, idx) => (
                <div
                  key={perfume.id}
                  className={styles.productCard}
                  onClick={() => setDestaque(idx)}
                >
                  <Image src={perfume.imagem} alt={perfume.nome} width={100} height={140} />
                  <span>{perfume.nome}</span>
                  <span>R$ {perfume.preco.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {produtoAtual && (
          <aside className={styles.sidebar}>
            <button className={styles.closeBtn} onClick={() => setDestaque(null)}>Fechar</button>
            <div className={styles.sidebarContent}>
              <Image
                src={produtoAtual.imagem}
                alt={produtoAtual.nome}
                width={180}
                height={240}
                className={styles.perfumeImg}
                priority
              />
              <h2>{produtoAtual.nome}</h2>
              <h3>{produtoAtual.marca}</h3>
              <span className={styles.perfumePreco}>R$ {produtoAtual.preco.toFixed(2)}</span>
              <button
                className={styles.perfumeBtn}
                onClick={() =>
                  window.open(
                    `https://wa.me/558496377622?text=Olá! Tenho interesse no perfume ${encodeURIComponent(produtoAtual.nome)}`,
                    "_blank"
                  )
                }
              >
                COMPRAR
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

"use client";
import styles from './page.module.css';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation"; // Importar redirect

// Definindo uma interface para os produtos da API da dummyjson
interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Interface para o formato de perfume que seu componente espera
interface Perfume {
  id: number | string;
  nome: string;
  marca: string;
  preco: number;
  imagem: string;
  descricao?: string;
}

export default function Home() {
  const router = useRouter();
  const [perfumesListados, setPerfumesListados] = useState<Perfume[]>([]);
  const [destaque, setDestaque] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false); // Estado para controlar a verificação de autenticação

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      // Se não estiver autenticado, redireciona para a página de login
      redirect("/login");
    } else {
      setAuthChecked(true); // Marca que a autenticação foi verificada
    }
  }, []);
  useEffect(() => {
    // Verifica se a autenticação foi verificada antes de buscar os perfumes
    if (!authChecked) {
      return;
    }

    // Função para buscar os perfumes da API
    async function fetchPerfumes() {
      try {
        const response = await fetch('https://dummyjson.com/products/category/fragrances');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: { products: DummyProduct[] } = await response.json();
        // Transforma os dados da API para o formato Perfume
        const perfumesFormatados: Perfume[] = data.products.map(product => ({
          id: product.id,
          nome: product.title,
          marca: product.brand,
          preco: product.price,
          imagem: product.thumbnail, // Usando thumbnail como imagem principal
          descricao: product.description,
        }));
        setPerfumesListados(perfumesFormatados);
      // ...
    } catch (e: unknown) { // <-- LINHA CORRIGIDA
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Ocorreu um erro desconhecido");
      }
      console.error("Falha ao buscar perfumes:", e);
    } finally {
        setIsLoading(false);
      }
    }

    fetchPerfumes();
  }, [authChecked]);

  const produtoAtual = destaque !== null && perfumesListados[destaque] ? perfumesListados[destaque] : null;

    // Se a autenticação ainda não foi verificada, não renderiza nada ou um loader.
  // O redirect cuidará de levar para /login se necessário.
  if (!authChecked) {
    return null; // Ou um componente de loading global, se preferir.
  }

  // Se estiver carregando os perfumes (após autenticação)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <span className="text-xl animate-pulse">Carregando perfumes...</span>
      </div>
    );
  }

  // Se houver erro ao carregar os perfumes (após autenticação)
  if (error) {
    return <div className="text-red-500 text-center mt-10">Erro ao carregar perfumes: {error}</div>;
  }

  return (
    <div className={styles.catalogWrapper}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <h1>MCosmeticos</h1>
        </div>
        <button onClick={() => {
          localStorage.removeItem("auth");
          router.push("/login"); // Redireciona para login após sair
        }} className={styles.authBtn}>Sair</button>
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
                  <Image src={perfume.imagem} alt={perfume.nome} width={100} height={140} style={{ objectFit: 'contain' }} />
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
              {produtoAtual.descricao && <p className={styles.perfumeDescricao}>{produtoAtual.descricao}</p>}
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

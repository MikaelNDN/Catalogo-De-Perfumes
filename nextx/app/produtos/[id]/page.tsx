"use client";
import { useState } from "react";
import Image from "next/image";
// Ajuste o caminho abaixo conforme a localização real do arquivo perfumes.ts ou perfumes.json
// Ajuste o caminho abaixo conforme a localização real do arquivo perfumes.ts ou perfumes.json
// Exemplo: import { perfumes } from "@/data/perfumes"; ou "./perfumes" se estiver na mesma pasta
// Altere o caminho abaixo conforme a localização real do arquivo perfumes.ts ou perfumes.json
import { perfumes } from "./perfumes";

type Perfume = {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  imagem: string;
  variacoes: {
    nome: string;
    preco: number;
    imagem: string;
  }[];
}

// Observação: Esta página está em um segmento de rota dinâmico '[id]', mas atualmente não utiliza o 'id'
// da URL para exibir um produto específico. Em vez disso, exibe uma lista de todos os perfumes.
// Para usar o parâmetro da rota, você normalmente aceitaria 'params' como prop:
// const ProdutoPage = ({ params }: { params: { id: string } }) => {
//   const productId = parseInt(params.id, 10);
//   const perfume = perfumes.find(p => p.id === productId);
//   // ... e então renderizaria os detalhes do 'perfume'
// };

const ProdutoPage = () => {
  const [selecionado, setSelecionado] = useState<number | null>(null);

  const perfumeSelecionado = perfumes.find((p: Perfume) => p.id === selecionado);

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Perfumes</h1>
      <div className="flex flex-wrap gap-8 justify-center w-full max-w-5xl">
        {perfumes.map((perfume: Perfume) => (
          <div
            key={perfume.id}
            className="bg-neutral-800 rounded-xl p-4 cursor-pointer hover:ring-2 ring-pink-400 transition"
            onClick={() => setSelecionado(perfume.id)}
          >
            <Image
              src={perfume.imagem}
              alt={perfume.nome}
              width={160}
              height={200}
              className="rounded-lg object-contain bg-white"
            />
            <div className="mt-2 text-center">
              <div className="font-semibold">{perfume.nome}</div>
              <div className="text-sm text-neutral-400">{perfume.marca}</div>
              <div className="text-pink-400 font-bold">R$ {perfume.preco.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {perfumeSelecionado && (
        <div className="fixed top-24 right-8 bg-neutral-800 rounded-xl shadow-lg p-6 w-80 z-50">
          <h2 className="text-xl font-bold mb-4">{perfumeSelecionado.nome} - Variações</h2>
          <ul>
            {perfumeSelecionado.variacoes.map((v: { nome: string; preco: number; imagem: string }, idx: number) => (
              <li key={idx} className="flex items-center gap-3 mb-3 bg-neutral-900 rounded-lg p-2">
                <Image
                  src={v.imagem}
                  alt={v.nome}
                  width={48}
                  height={60}
                  className="rounded bg-white"
                />
                <div>
                  <div className="font-semibold">{v.nome}</div>
                  <div className="text-pink-400 font-bold">R$ {v.preco.toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded"
            onClick={() => setSelecionado(null)}
          >
            Fechar
          </button>
        </div>
      )}
    </main>
  );
};

export default ProdutoPage;
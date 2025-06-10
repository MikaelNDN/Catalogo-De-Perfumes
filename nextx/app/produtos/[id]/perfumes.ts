export type Perfume = {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  imagem: string; // Caminho relativo à pasta public, ex: /perfumes/nome-do-perfume.jpg
  variacoes: {
    nome: string;
    preco: number;
    imagem: string; // Caminho relativo à pasta public, ex: /perfumes/variacoes/nome-variacao.jpg
  }[];
};

export const perfumes: Perfume[] = [
  {
    id: 1,
    nome: "Empire Legacy",
    marca: "Hinode",
    preco: 450.90,
    imagem: "/empire1.png", 
    variacoes: [
      {
        nome: "100ml",
        preco: 450.90,
        imagem: "/empire1.png",  
      },
    ],
  },
  {
    id: 2,
    nome: "Essencial Unico",
    marca: "Natura",
    preco: 650.00,
    imagem: "/essencial2.png",
    variacoes: [
      {
        nome: "100ml",
        preco: 650.00,
        imagem: "/essencial2.png",
      },
    ],
  },
  {
    id: 3,
    nome: "Inebriante Eau de Parfum",
    marca: "Hinode",
    preco: 580.75,
    imagem: "/inebriante1.png",
    variacoes: [
       {
        nome: "100ml",
        preco: 650.00,
        imagem: "/inebriante1.png",
      },
    ],
  },
  {
    id: 4,
    nome: "Latitude Stamina",
    marca: "Hinode",
    preco: 399.00,
    imagem: "/latitude1.png",
    variacoes: [
      {
        nome: "100ml",
        preco: 250.00,
        imagem: "/latitude1.png",
      },
    ],
  },
];
const { useEffect, useState } = React;

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Av.+Alm.+Jaceguay,+2712+-+Costa+e+Silva,+Joinville+-+SC,+89218-691";
const LINKTREE_URL = "https://linktr.ee";
const PHONE_URL = "tel:+554730131212";

const BRAZIL_TZ = "America/Sao_Paulo";

function nowInBrasilia() {
  const iso = new Date().toLocaleString("sv-SE", { timeZone: BRAZIL_TZ });
  const [datePart, timePart] = iso.split(" ");
  const [y, m, d] = datePart.split("-").map(Number);
  const [h, min, s] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, h, min, s);
}

function isBigHallOpen() {
  const now = nowInBrasilia();
  const day = now.getDay();
  if (day === 1) return false; // segunda‑feira
  const hour = now.getHours();
  return hour >= 11 && hour < 23;
}

/* ------------------------------------------------------------------ */
/* Dados estáticos (menus, cards, textos…)                           */
/* ------------------------------------------------------------------ */
const serviceModes = [
  "Refeição no local",
  "Para viagem",
  "Entrega sem contato",
];

const heroMetrics = [
  { value: 4.6, label: "nota média", format: "decimal" },
  { value: 2553, label: "avaliações", format: "number" },
  { value: 648, label: "relatos de preço", format: "number" },
];

const statHighlights = [
  {
    title: "Cardápio extenso",
    text: "Pratos feitos, lanches gourmet, porções, bebidas, drinks e cervejas no mesmo lugar.",
  },
  {
    title: "Clima de encontro",
    text: "Ambiente conhecido pelo perfil familiar, descontraído e com bom espaço para grupos.",
  },
  {
    title: "Destaque da casa",
    text: "Torre de Batata, porções mistas, buffet e hambúrgueres entre os itens mais lembrados.",
  },
];

const aboutCards = [
  {
    title: "Experiência para toda a família",
    text:
      "As avaliações reforçam um ambiente agradável, com espaço acolhedor e variedade para agradar diferentes idades.",
  },
  {
    title: "Operação completa o dia inteiro",
    text:
      "A Big Hall atende almoço, jantar e momentos de lazer com buffet, pratos executivos, drinks, cervejas e lanches autorais.",
  },
  {
    title: "Movimento equilibrado aos sábados",
    text:
      "O fluxo costuma ficar em nível confortável, ideal para quem quer boa experiência sem perder agilidade no atendimento.",
    peakBars: [24, 36, 54, 68, 82, 64],
  },
];

const menuHighlights = [
  {
    badge: "Queridinho",
    title: "Torre de Batata",
    text:
      "Serve de 2 a 3 pessoas e aparece em versões com bacon, coração, frango e calabresa.",
  },
  {
    badge: "Executivo",
    title: "Pratos feitos",
    text:
      "Opções de R$ 30,00 e R$ 37,00 com arroz, feijão, fritas, farofa, salada e carne à escolha.",
  },
  {
    badge: "Bar da casa",
    title: "Drinks, cervejas e chopp",
    text:
      "Carta diversa com caipirinhas, coquetéis, batidas, long necks, artesanais e chopp em dois tamanhos.",
  },
  {
    badge: "Gourmet",
    title: "Lanches especiais",
    text:
      "Linha Galáxia e planetas com hambúrgueres de 150g, cheddar cremoso e combinações marcantes.",
  },
  {
    badge: "Compartilhar",
    title: "Porções e mistas",
    text:
      "Formatos pequena, média e grande, além de composições para mesa com preço fixo.",
  },
  {
    badge: "Refrescante",
    title: "Sucos, caldo de cana e bebidas",
    text:
      "Vai do refrigerante tradicional até soda italiana, jarra de suco, água, tônica e opções sem álcool.",
  },
];

const menuCategoryPills = [
  "Bebidas",
  "Chopp e cervejas",
  "Coquetéis e doses",
  "Pratos feitos",
  "Porções",
  "Lanches gourmet",
];

const menuSections = [
  {
    id: "bebidas",
    eyebrow: "Bebidas sem álcool",
    title: "Refrigerantes, águas, sucos e refrescos",
    columns: 2,
    groups: [
      {
        title: "Refrigerante 200ml",
        items: [
          { name: "Coca-Cola / Coca-Cola Zero", price: "R$ 4,00" },
          { name: "Guaraná / Guaraná Zero", price: "R$ 4,00" },
        ],
      },
      {
        title: "Refrigerante 290ml (KS)",
        items: [{ name: "Coca-Cola", price: "R$ 6,00" }],
      },
      {
        title: "Refrigerante 350ml",
        items: [
          { name: "Coca-Cola / Coca-Cola Zero", price: "R$ 7,00" },
          { name: "Sprite", price: "R$ 7,00" },
          { name: "Guaraná / Guaraná Zero", price: "R$ 7,00" },
          { name: "Fanta Laranja", price: "R$ 7,00" },
          { name: "Schweppes Citrus", price: "R$ 7,00" },
        ],
      },
      {
        title: "Refrigerante 600ml",
        items: [
          { name: "Coca-Cola / Coca-Cola Zero", price: "R$ 10,00" },
          { name: "Guaraná / Guaraná Zero", price: "R$ 10,00" },
          { name: "Fanta Laranja", price: "R$ 10,00" },
          { name: "Sprite", price: "R$ 10,00" },
        ],
      },
      {
        title: "Água",
        items: [
          { name: "Água sem gás 400ml", price: "R$ 4,00" },
          { name: "Água com gás 400ml", price: "R$ 4,00" },
          { name: "H2O Limão", price: "R$ 7,50" },
          { name: "Tônica", price: "R$ 7,00" },
        ],
      },
      {
        title: "Sucos e vitaminas",
        items: [
          { name: "Suco 400ml", price: "R$ 10,00" },
          {
            name: "Vitaminas 400ml",
            price: "R$ 13,00",
            note:
              "Sabores citados: abacaxi, abacaxi com hortelã, amora, acerola, frutas vermelhas, laranja, limão, limonada suíça, maracujá ou morango.",
          },
          { name: "Jarra de suco", price: "R$ 23,00" },
        ],
      },
      {
        title: "Caldo de cana",
        items: [
          { name: "Copo 400ml", price: "R$ 8,00" },
          { name: "Jarra 500ml", price: "R$ 10,00" },
          { name: "Jarra 1000ml", price: "R$ 18,00" },
          { name: "Garrafa 500ml", price: "R$ 11,00" },
          { name: "Garrafa 1000ml", price: "R$ 19,00" },
        ],
      },
      {
        title: "Outras opções",
        items: [
          { name: "Del Valle 450ml", price: "R$ 8,00", note: "Sabores: uva e laranja." },
          {
            name: "Soda Italiana 300ml",
            price: "R$ 15,00",
            note: "Sabores: morango, maçã verde, tangerina, melancia ou limão.",
          },
          { name: "Limão espremido", price: "R$ 0,50", note: "Valor por copo." },
        ],
      },
    ],
  },
  {
    id: "bar",
    eyebrow: "Bar da Big Hall",
    title: "Chopp, cervejas e caipirinha",
    columns: 2,
    groups: [
      {
        title: "Chopp",
        items: [
          { name: "Pilsen 300ml", price: "R$ 14,00" },
          { name: "Pilsen 500ml", price: "R$ 18,00" },
          { name: "Chopp com vinho 300ml", price: "R$ 15,00" },
          { name: "Chopp com vinho 500ml", price: "R$ 19,00" },
          { name: "Heineken 300ml", price: "R$ 15,00" },
          { name: "Heineken 500ml", price: "R$ 19,00" },
          { name: "IPA 300ml", price: "R$ 15,00" },
          { name: "IPA 500ml", price: "R$ 19,00" },
          { name: "Brahma 300ml", price: "R$ 15,00" },
          { name: "Brahma 500ml", price: "R$ 19,00" },
        ],
      },
      {
        title: "Cerveja artesanal (Bierbaum)",
        items: [
          { name: "Lager", price: "R$ 18,00" },
          { name: "American IPA", price: "R$ 20,00" },
          { name: "Dunkel", price: "R$ 22,00" },
          { name: "Vienna", price: "R$ 22,00" },
          { name: "Weiss", price: "R$ 20,00" },
          { name: "Extra", price: "R$ 20,00" },
        ],
      },
      {
        title: "Cerveja long neck",
        items: [
          { name: "Heineken 0% álcool", price: "R$ 12,00" },
          { name: "Heineken", price: "R$ 12,00" },
          { name: "Malzbier", price: "R$ 12,00" },
          { name: "Brahma 0% álcool", price: "R$ 11,00" },
          { name: "Budweiser", price: "R$ 10,00" },
          { name: "Eisenbahn", price: "R$ 12,00" },
          { name: "Spaten", price: "R$ 11,00" },
        ],
      },
      {
        title: "Cerveja garrafa",
        items: [
          { name: "Heineken", price: "R$ 20,00" },
          { name: "Budweiser", price: "R$ 16,00" },
          { name: "Original", price: "R$ 18,00" },
          { name: "Amstel", price: "R$ 17,00" },
          { name: "Brahma", price: "R$ 16,00" },
          { name: "Spaten", price: "R$ 18,00" },
        ],
      },
      {
        title: "Caipirinha",
        items: [
          { name: "Tradicional", price: "R$ 20,00", note: "Limão e cachaça." },
          {
            name: "Frutas",
            price: "R$ 26,00",
            note: "Morango, abacaxi, kiwi e maracujá.",
          },
          {
            name: "Bases disponíveis",
            price: "Sob consulta",
            note: "Cachaça, vodka, rum, vinho, steinhaeger e sake.",
          },
        ],
      },
      {
        title: "Clássico",
        items: [
          { name: "Cuba Libre", price: "R$ 18,00", note: "Coca-Cola com Bacardi ou Smirnoff." },
        ],
      },
    ],
  },
  {
    id: "drinks",
    eyebrow: "Drinks e coquetelaria",
    title: "Coquetéis, batidas, drinks kids, vinhos e doses",
    columns: 2,
    groups: [
      {
        title: "Coquetéis — R$ 28,00",
        items: [
          { name: "Aperol Spritz", note: "Aperol, espumante e água com gás." },
          {
            name: "Gin Tropical",
            note: "Gin, limão siciliano, red bull tropical, maracujá e pimenta rosa.",
          },
          {
            name: "Compoteira de Frutas Vermelhas",
            note: "Vodka, frutas vermelhas e xarope de hibisco.",
          },
          {
            name: "Moscow Mule",
            note: "Vodka, água com gás, suco de limão e xarope de gengibre.",
          },
          { name: "Negroni", note: "Gin, Vermouth rosso e Campari." },
          {
            name: "Florência",
            note: "Gin, suco de laranja, suco de limão, morango, blueberry e espuma cítrica de gengibre.",
          },
          {
            name: "Cosmopolitan",
            note: "Vodka, limão, licor de laranja e xarope de cereja.",
          },
        ],
      },
      {
        title: "Batidas — R$ 28,00",
        items: [
          {
            name: "Morango",
            note: "Vodka, morango, creme de leite e leite condensado.",
          },
          {
            name: "Espanhola",
            note: "Vinho, suco de abacaxi, creme de leite e leite condensado.",
          },
          {
            name: "Piña Colada",
            note: "Rum de coco, suco de abacaxi, coco ralado, leite de coco, creme de leite e leite condensado.",
          },
          {
            name: "Maracujá",
            note: "Vodka, maracujá, creme de leite e leite condensado.",
          },
        ],
      },
      {
        title: "Drinks kids — R$ 19,00",
        items: [
          {
            name: "Coffee Cream Gelato",
            note: "Café, leite condensado, leite ninho, açúcar, caramelo e chantilly.",
          },
          {
            name: "Limonada das Neves",
            note: "Leite de coco e suco de limão.",
          },
        ],
      },
      {
        title: "Vinhos",
        items: [
          {
            name: "Taça de vinho seco (200ml)",
            price: "R$ 18,00",
            note: "Miolo, Cabernet Sauvignon e Merlot.",
          },
          {
            name: "Taça de vinho suave (200ml)",
            price: "R$ 12,00",
            note: "Sinuelo.",
          },
        ],
      },
      {
        title: "Doses",
        items: [
          { name: "Velho Barreiro", price: "R$ 4,00" },
          { name: "Ypioca Prata", price: "R$ 7,00" },
          { name: "Ypioca Ouro", price: "R$ 7,00" },
          { name: "Smirnoff", price: "R$ 10,00" },
          { name: "Bacardi (Rum)", price: "R$ 15,00" },
          { name: "Tanqueray", price: "R$ 20,00" },
          { name: "Steinhaeger", price: "R$ 15,00" },
          { name: "Campari", price: "R$ 10,00" },
          { name: "Jägermeister", price: "R$ 18,00" },
          { name: "José Cuervo Prata", price: "R$ 15,00" },
          { name: "José Cuervo Ouro", price: "R$ 15,00" },
          { name: "Red Label", price: "R$ 18,00" },
          { name: "Black Label", price: "R$ 20,00" },
          { name: "Jack Daniels", price: "R$ 20,00" },
          { name: "Licor 43", price: "R$ 20,00" },
        ],
      },
    ],
  },
];

const dishSection = {
  eyebrow: "Pratos feitos",
  title: "Almoço prático com porção completa",
  note:
    "Acompanhamento com arroz, feijão, batatas fritas, farofa, salada e a carne da sua escolha. No prato acompanha 1 tipo de carne.",
  options: [
    {
      name:
        "Peito de frango, peixe frito (filé empanado), frango a passarinho, bisteca, calabresa ou almôndegas",
      price: "R$ 30,00",
    },
    {
      name: "Alcatra, contra filé, bife a cavalo ou costela",
      price: "R$ 37,00",
    },
  ],
};

const portionsSection = {
  eyebrow: "Porções e torres",
  title: "Para dividir, montar combos e pedir a assinatura da casa",
  sizes: [
    {
      name: "Anel de cebola",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Batata frita",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Polenta frita",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Frango à passarinho",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Aipim com bacon",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "—" },
    },
    {
      name: "Coração de frango",
      prices: { small: "—", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Batata canoa frita",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "R$ 62,00" },
    },
    {
      name: "Bolinho de aipim com linguiça",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "—" },
    },
    {
      name: "Isca de frango na farinha panko",
      prices: { small: "R$ 33,00", medium: "R$ 47,00", large: "—" },
    },
  ],
  mixed: [
    "Batata, polenta e aipim com bacon — R$ 135,00",
    "Batata, polenta e frango à passarinho — R$ 135,00",
    "Aipim com bacon, batata e frango à passarinho — R$ 135,00",
    "Aipim com bacon, batata e coração de frango — R$ 135,00",
    "Bolinho de aipim com linguiça, isca de frango na farinha panko e anel de cebola — R$ 135,00",
  ],
  extras: [
    { name: "Bacon", price: "R$ 17,00" },
    { name: "Calabresa", price: "R$ 15,00" },
    { name: "Frango", price: "R$ 15,00" },
  ],
  tower: [
    { name: "Bacon", price: "R$ 85,00" },
    { name: "Coração", price: "R$ 85,00" },
    { name: "Frango", price: "R$ 85,00" },
    { name: "Calabresa", price: "R$ 85,00" },
    { name: "Bacon, frango, calabresa e coração", price: "R$ 95,00" },
  ],
};

const gourmetBurgers = {
  eyebrow: "Lanches gourmet",
  title: "Linha especial com burgers de 150g e adicional de combo",
  note:
    "Com acréscimo de R$ 10,00 você turbina seu lanche com fritas e refrigerante.",
  burgers: [
    {
      name: "Galáxia",
      price: "R$ 37,00",
      description:
        "Pão à sua escolha (tradicional ou brioche), 1 hambúrguer de 150g, cheddar cremoso, folhas de alface americana e rodelas de tomate.",
    },
    {
      name: "Planeta Marte",
      price: "R$ 43,00",
      description:
        "Pão à sua escolha (tradicional ou brioche), 2 hambúrgueres de 150g cada, cheddar cremoso, cebola caramelizada ao mel com especiarias do chef e fatias de bacon crocante.",
    },
    {
      name: "Planeta Vênus",
      price: "R$ 43,00",
      description:
        "Pão à sua escolha (tradicional ou brioche), 1 hambúrguer de 150g, cheddar cremoso e fatias de bacon crocante.",
    },
    {
      name: "Planeta Terra",
      price: "R$ 45,00",
      description:
        "Pão à sua escolha (tradicional ou brioche), 1 hambúrguer de 150g, costela assada e desfiada, molho barbecue, cheddar cremoso, folhas de alface americana e rodelas de tomate.",
    },
  ],
  comboSides: [
    "Batata palito",
    "Batata rústica",
    "Batata noisettes",
    "Anel de cebola",
  ],
  comboDrinks: [
    "Coca-Cola Tradicional 350ml",
    "Coca-Cola Zero 350ml",
    "Guaraná Antarctica 350ml",
    "Guaraná Antarctica Zero 350ml",
    "Sprite 350ml",
    "Fanta Laranja 350ml",
    "Fanta Uva 350ml",
  ],
};

const reviewQuotes = [
  {
    text:
      '"Tem buffet livre, prato feito, pastel, lanche, porção, pizza, açaí."',
    author: "Resumo das avaliações",
  },
  {
    text:
      '"Bem gostoso o ambiente, espaço kids bacana, comidinha do buffet boa."',
    author: "Resumo das avaliações",
  },
  {
    text:
      '"Experiência incrível, comida de excelente qualidade e muitas opções de buffet e sobremesas."',
    author: "Fábio Cordeiro",
  },
];

const contactCards = [
  {
    label: "Endereço",
    content: "Av. Alm. Jaceguay, 2712 - Costa e Silva, Joinville - SC",
  },
  {
    label: "Telefone",
    content: "(47) 3013-1212",
    href: PHONE_URL,
  },
  {
    label: "Funcionamento",
    content: "Aberto agora • Fecha às 23:00",
  },
  {
    label: "Canais digitais",
    content: "cardapiodigital.io • linktr.ee",
  },
];

const quickFactsFresh = [
  "4,6 (2.554)",
  "R$ 40-60 por pessoa",
  "Pizzaria",
  "Aberto - Fecha 23:00",
];

const mapsActionsFresh = [
  "Rotas",
  "Salvar",
  "Proximo",
  "Enviar para o smartphone",
  "Compartilhar",
  "Pedir on-line",
];

const serviceModesFresh = [
  "Refeição no local",
  "Para viagem",
  "Entrega sem contato",
];

const heroMetricsFresh = [
  { value: 4.6, label: "nota média", format: "decimal" },
  { value: 2554, label: "avaliações", format: "number" },
  { value: 648, label: "relatos de preço", format: "number" },
];

const statHighlightsFresh = [
  {
    title: "Faixa de preço",
    text: "R$ 40-60 por pessoa, informado por 648 pessoas.",
  },
  {
    title: "Destaques do cardápio",
    text: "Mais pedidos: Torre de Batata e Chapeado.",
  },
  {
    title: "Localização",
    text: "Av. Alm. Jaceguay, 2712 - Costa e Silva",
  },
];

const aboutCardsFresh = [
  {
    title: "Endereço completo",
    text: "Av. Alm. Jaceguay, 2712 - Costa e Silva, Joinville - SC, 89218-691.",
  },
  {
    title: "Canais oficiais",
    text: "linktr.ee • (47) 3013-1212",
  },
  {
    title: "Horários de pico",
    text: "Domingos: agora um pouco movimentado, com pico entre 12h e 18h.",
    peakBars: [16, 30, 62, 80, 86, 54],
  },
];

const reviewQuotesFresh = [
  {
    text: '"Tem buffet livre, prato feito, pastel, lanche, porção, pizza, açaí."',
    author: "Resumo de avaliações",
  },
  {
    text: '"Bem gostoso o ambiente, espaço kids bacana, comidinha do buffet boa."',
    author: "Resumo de avaliações",
  },
  {
    text: '"Experiência de estar no campo, com opção para toda a família e todas as idades."',
    author: "Resumo de avaliações",
  },
];

const featuredReviewsFresh = [
  {
    text:
      "Mari Reis: no almoço de domingo (31/08/2025), comentou que a opção por quilo estava ok e com sobremesa inclusa.",
    author: "Local Guide - 119 avaliações - 353 fotos",
  },
  {
    text:
      "Jully Valim: relatou experiência mista e ponto de atenção com item de camarão.",
    author: "5 avaliações",
  },
  {
    text:
      "Fábio Cordeiro: destacou qualidade, variedade de buffet e sobremesas, e disse que voltaria em nova viagem.",
    author: "Local Guide - 11 avaliações - 6 fotos",
  },
];

const relatedPlacesFresh = [
  "Big Hall Pizzas - 4,2 (118) - Pizza",
  "Alcatra Burguer Joinville - 4,7 (1.114) - Restaurante",
  "Deck Lanches Joinville - 4,7 (379) - Restaurante",
  "Zum Schlauch - 4,5 (2.204) - Alema",
  "Big House Burguer - 3,9 (53) - Restaurante",
];

const contactCardsFresh = [
  {
    label: "Endereço",
    content:
      "Av. Alm. Jaceguay, 2712 - Costa e Silva, Joinville - SC, 89218-691",
  },
  {
    label: "Telefone",
    content: "(47) 3013-1212",
    href: PHONE_URL,
  },
  {
    label: "Funcionamento",
    content: "Aberto - Fecha 23:00",
  },
  {
    label: "Faixa de preço",
    content: "R$ 40-60 por pessoa (648 relatos)",
  },
  {
    label: "Linktree",
    content: "linktr.ee",
    href: LINKTREE_URL,
  },
  {
    label: "Plus code",
    content: "P4GG+HW Costa e Silva, Joinville - SC",
  },
];

const weeklyHoursFresh = [
  { day: "domingo", hours: "11:00-23:00" },
  { day: "segunda-feira", hours: "Fechado" },
  { day: "terça-feira", hours: "11:00-23:00", note: "Os horários podem ser diferentes" },
  { day: "quarta-feira", hours: "11:00-23:00" },
  { day: "quinta-feira", hours: "11:00-23:00" },
  { day: "sexta-feira", hours: "11:00-23:00" },
  { day: "sábado", hours: "11:00-23:00" },
];

function formatMetric(value, format, suffix = "") {
  const formatted =
    format === "decimal"
      ? value.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : value.toLocaleString("pt-BR");
  return `${formatted}${suffix}`;
}

/* ----------------------------------------------------------------- */
/* Componentes UI                                                    */
/* ----------------------------------------------------------------- */
function BigHallLogoLegacy({ compact = false }) {
  return (
    <div className={`logo-seal ${compact ? "logo-seal-compact" : ""}`}>
      <div className="logo-ring"></div>
      <div className="logo-inner">
        <span className="logo-top">Restaurante</span>
        <svg className="logo-roof" viewBox="0 0 160 70" aria-hidden="true">
          <path
            d="M20 42 L80 8 L140 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 36 V58 H122 V36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M80 13 V58" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <strong>Big Hall</strong>
        <span className="logo-stars">★ ★ ★</span>
        <span className="logo-bottom">Lanchonete</span>
      </div>
    </div>
  );
}

function BigHallLogo({ compact = false }) {
  return (
    <div className={`logo-seal ${compact ? "logo-seal-compact" : ""}`}>
      <img className="logo-image" src="img/big_hall_logo.png" alt="Logo da Big Hall Lanchonete" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-heading section-heading-${align} reveal`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function MetricCard({ metric }) {
  return (
    <div className="metric-card">
      <strong
        className="metric-value"
        data-target={metric.value}
        data-format={metric.format}
        data-suffix={metric.suffix || ""}
      >
        {formatMetric(metric.value, metric.format, metric.suffix)}
      </strong>
      <span>{metric.label}</span>
    </div>
  );
}

function InfoCard({ item, index }) {
  return (
    <article className="info-card reveal">
      <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      {item.peakBars ? (
        <div className="peak-chart" aria-label="Horário de pico aos sábados">
          {item.peakBars.map((height, barIndex) => (
            <span key={barIndex} style={{ "--bar": `${height}%` }}></span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function HighlightCard({ item }) {
  return (
    <article className="menu-card reveal">
      <span className="menu-badge">{item.badge}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}

function ReviewCard({ quote }) {
  return (
    <article className="review-card reveal">
      <p>{quote.text}</p>
      <span>{quote.author}</span>
    </article>
  );
}

function ContactCard({ item }) {
  return (
    <article className="contact-card">
      <span className="contact-label">{item.label}</span>
      <p>{item.href ? <a href={item.href}>{item.content}</a> : item.content}</p>
    </article>
  );
}

function HoursCard() {
  return (
    <article className="contact-card">
      <span className="contact-label">Horários de funcionamento</span>
      <div className="hours-list">
        {weeklyHoursFresh.map((item) => (
          <div className="hours-row" key={item.day}>
            <strong>{item.day}</strong>
            <span>{item.hours}</span>
            {item.note ? <small>{item.note}</small> : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function MenuGroup({ group }) {
  return (
    <article className="menu-group reveal">
      <div className="menu-group-header">
        <h3>{group.title}</h3>
      </div>
      <div className="menu-lines">
        {group.items.map((item) => (
          <div className="menu-line" key={`${group.title}-${item.name}`}>
            <div className="menu-line-copy">
              <strong>{item.name}</strong>
              {item.note ? <small>{item.note}</small> : null}
            </div>
            {item.price ? <span className="menu-price">{item.price}</span> : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function MenuSection({ section }) {
  return (
    <section className="section full-menu-section" id={section.id}>
      <div className="full-menu-head">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          text="Informações organizadas a partir do cardápio enviado, com leitura mais limpa, hierarquia visual e navegação rápida."
        />
      </div>
      <div className={`menu-groups-grid menu-groups-${section.columns || 2}`}>
        {section.groups.map((group) => (
          <MenuGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

function PortionsTable() {
  return (
    <div className="portions-table reveal">
      <div className="portions-head">
        <span>Porção</span>
        <span>Pequena</span>
        <span>Média</span>
        <span>Grande</span>
      </div>
      {portionsSection.sizes.map((item) => (
        <div className="portions-row" key={item.name}>
          <strong>{item.name}</strong>
          <span>{item.prices.small}</span>
          <span>{item.prices.medium}</span>
          <span>{item.prices.large}</span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Componente raiz (App)                                             */
/* ----------------------------------------------------------------- */
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // status “Aberto agora / Estamos fechados”

  /* Header scroll */
  useEffect(() => {
    const syncHeader = () => setIsScrolled(window.scrollY > 18);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    return () => window.removeEventListener("scroll", syncHeader);
  }, []);

  /* Verifica horário (a cada minuto) */
  useEffect(() => {
    const check = () => setIsOpen(isBigHallOpen());
    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, []);

  /* Animações de reveal / métricas */
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const metricElements = document.querySelectorAll(".metric-value");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const animateMetric = (element) => {
      const target = Number(element.dataset.target || 0);
      const format = element.dataset.format || "number";
      const suffix = element.dataset.suffix || "";
      const duration = 1200;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = format === "decimal" ? target * eased : Math.round(target * eased);
        element.textContent = formatMetric(current, format, suffix);
        if (progress < 1) requestAnimationFrame(step);
        else element.textContent = formatMetric(target, format, suffix);
      };
      requestAnimationFrame(step);
    };

    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateMetric(entry.target);
            metricObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.65 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    metricElements.forEach((el) => metricObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      metricObserver.disconnect();
    };
  }, []);

  /* JSX */
  return (
    <div className="app-shell">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ir para o topo">
          <BigHallLogo compact />
          <span className="brand-copy">
            <strong>Big Hall</strong>
            <small>Restaurante • Lanchonete • Joinville</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#menu-completo">Cardápio</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#contato">Contato</a>
        </nav>

        <a className="button button-dark desktop-only" href={PHONE_URL}>
          Ligar agora
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section" id="inicio">
          <div className="hero-copy reveal">
            <span className="eyebrow">
              4,6 estrelas • 2.553 avaliações • estética renovada da marca
            </span>
            <h1>
              Big Hall com atendimento premium, identidade forte e cardápio completo.
            </h1>
            <p className="hero-text">
              Está procurando um lugar bonito e bom para comer? Venha para o
              Big Hall! Analise o nosso cardápio.
            </p>

            <p className="hero-text">
              Big Hall Lanchonete · 4,6 (2.554) · R$ 40-60 · Pizzaria.
            </p>

            <div className="hero-actions">
              <a className="button button-accent" href="#menu-completo">
                Ver cardápio completo
              </a>
              <a className="button button-light" href={MAP_URL} target="_blank" rel="noreferrer">
                Ver rotas
              </a>
            </div>

            <div className="service-pills" aria-label="Modalidades de atendimento">
              {serviceModesFresh.map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>

            <div className="menu-pills reveal" aria-label="Ações no Google Maps">
              {mapsActionsFresh.map((action) => (
                <span key={action}>{action}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            {/* CARD INICIAL */}
            <article className="feature-panel feature-main">
              <div className="panel-kicker">
                <span className={`status-dot ${isOpen ? "open" : "closed"}`}></span>
                {isOpen ? "Aberto agora" : "Estamos fechados"}
              </div>

              <div className="hero-brand-block">
                <BigHallLogo />
                <div className="hero-brand-copy">
                  <span className="hero-brand-tag">Restaurante e lanchonete</span>
                  <h2>Fecha às 23:00</h2>
                  <p>
                    Um endereço conhecido em Joinville por reunir buffet, pratos
                    feitos, hamburgueres, porções, cervejas e drinks em um só
                    lugar.
                  </p>
                </div>
              </div>

              <div className="metric-grid">
                {heroMetricsFresh.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </div>
            </article>

            {/* CARD “MAIS PEDIDOS” */}
            <article className="feature-panel feature-floating">
              <span className="panel-label">Mais pedidos</span>
              <ul>
                <li>Torre de Batata</li>
                <li>Chapeado</li>
                <li>Pedir on-line</li>
              </ul>
            </article>

            {/* CARD “ASSINATURA DA MARCA” */}
            <article className="feature-panel feature-quote">
              <span className="panel-label">Assinatura da marca</span>
              <p>
                Preto, amarelo e uma leitura mais forte para comunicar presença,
                variedade e clima de casa cheia.
              </p>
            </article>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="stats-strip reveal" aria-label="Indicadores principais">
          {statHighlightsFresh.map((item) => (
            <article key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </article>
          ))}
        </section>

        {/* VISÃO GERAL DO GOOGLE MAPS */}
        <section className="section" id="visao-geral-google">
          <SectionHeading
            eyebrow="Visão geral do Google Maps"
            title="Informações principais enviadas"
            text="Compilado com base no conteúdo que você compartilhou."
          />
          <div className="menu-groups-grid menu-groups-2">
            <article className="menu-group reveal">
              <div className="menu-group-header">
                <h3>Dados rápidos</h3>
              </div>
              <div className="stack-list">
                {quickFactsFresh.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
                <span>
                  Endereço: Av. Alm. Jaceguay, 2712 - Costa e Silva, Joinville - SC,
                  89218-691
                </span>
                <span>Costa e Silva, Joinville - SC</span>
              </div>
            </article>

            <article className="menu-group reveal">
              <div className="menu-group-header">
                <h3>Ações e canais</h3>
              </div>
              <div className="stack-list">
                {mapsActionsFresh.map((action) => (
                  <span key={action}>{action}</span>
                ))}
                <span>Cardápio: cardapiodigital.io</span>
                <span>Linktree: linktr.ee</span>
                <span>Telefone: (47) 3013-1212</span>
              </div>
            </article>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="sobre">
          <SectionHeading
            eyebrow="Visão geral"
            title="Uma casa versátil com apelo popular e apresentação mais refinada."
            text="A nova interface valoriza a reputação local da Big Hall, reforça a marca no topo da experiência e organiza o cardápio em blocos mais claros para navegação rápida."
          />

          <div className="about-grid">
            {aboutCardsFresh.map((item, index) => (
              <InfoCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* MENU HIGHLIGHTS */}
        <section className="section menu" id="cardapio">
          <SectionHeading
            eyebrow="Destaques da casa"
            title="Itens e categorias que ajudam a vender a experiência logo de cara."
            text="Antes do cardápio completo, a página agora mostra os grupos mais estratégicos para conversão: pratos, porções, lanches e bar."
          />

          <div className="menu-grid">
            {menuHighlights.map((item) => (
              <HighlightCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* MENU CATALOG */}
        <section className="section menu-catalog" id="menu-completo">
          <SectionHeading
            eyebrow="Cardápio completo"
            title="Tudo organizado para leitura rápida e aparência profissional."
            text="Transformamos as imagens do cardápio em uma estrutura editorial mais elegante, com categorias, descrições e preços em um layout consistente."
            align="center"
          />

          <div className="menu-pills reveal">
            {menuCategoryPills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </section>

        {/* MENU SECTIONS (bebidas, bar, drinks) */}
        {menuSections.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}

        {/* PRATOS FEITOS */}
        <section className="section featured-dish-section" id="pratos-feitos">
          <div className="featured-dish-card reveal">
            <div className="featured-dish-copy">
              <span className="eyebrow">{dishSection.eyebrow}</span>
              <h2>{dishSection.title}</h2>
              <p>{dishSection.note}</p>
            </div>
            <div className="featured-dish-list">
              {dishSection.options.map((item) => (
                <div className="featured-dish-item" key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORÇÕES */}
        <section className="section portions-section" id="porcoes">
          <SectionHeading
            eyebrow={portionsSection.eyebrow}
            title={portionsSection.title}
            text="Estruturamos as porções em tabela, blocos de mix e destaque para a Torre de Batata, que é um dos ícones do cardápio."
          />

          <PortionsTable />

          <div className="portions-extras-grid">
            <article className="menu-group reveal">
              <div className="menu-group-header">
                <h3>Porções mistas</h3>
              </div>
              <div className="stack-list">
                {portionsSection.mixed.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>

            <article className="menu-group reveal">
              <div className="menu-group-header">
                <h3>Acréscimos</h3>
              </div>
              <div className="menu-lines">
                {portionsSection.extras.map((item) => (
                  <div className="menu-line" key={item.name}>
                    <div className="menu-line-copy">
                      <strong>{item.name}</strong>
                    </div>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="menu-group tower-card reveal">
              <div className="menu-group-header">
                <h3>Torre de Batata</h3>
                <small>Serve de 2 a 3 pessoas</small>
              </div>
              <div className="menu-lines">
                {portionsSection.tower.map((item) => (
                  <div className="menu-line" key={item.name}>
                    <div className="menu-line-copy">
                      <strong>{item.name}</strong>
                    </div>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* BURGERS */}
        <section className="section burgers-section" id="lanches">
          <SectionHeading
            eyebrow={gourmetBurgers.eyebrow}
            title={gourmetBurgers.title}
            text="Os lanches ganharam uma apresentação mais comercial, com foco em composição, valor percebido e incentivo visual para o combo."
          />

          <div className="burger-grid">
            {gourmetBurgers.burgers.map((burger) => (
              <article className="burger-card reveal" key={burger.name}>
                <div className="burger-head">
                  <h3>{burger.name}</h3>
                  <span>{burger.price}</span>
                </div>
                <p>{burger.description}</p>
              </article>
            ))}
          </div>

          <div className="combo-panel reveal">
            <div className="combo-copy">
              <span className="eyebrow">Upgrade de combo</span>
              <h3>{gourmetBurgers.note}</h3>
            </div>
            <div className="combo-grid">
              <div>
                <strong>Acompanhamento</strong>
                <ul>
                  {gourmetBurgers.comboSides.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Refrigerante</strong>
                <ul>
                  {gourmetBurgers.comboDrinks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section reviews" id="avaliacoes">
          <SectionHeading
            eyebrow="Resumo de avaliações"
            title="Boa reputação local combinada com um site agora mais forte visualmente."
            text="A prova social continua sendo uma peça importante da conversão, então mantivemos esse bloco e alinhamos a apresentação à nova identidade."
          />

          <div className="reviews-layout">
            <article className="rating-card reveal">
              <div className="rating-number">4,6</div>
              <div className="rating-copy">
                <strong>2.553 avaliações públicas</strong>
                <p>
                  Presença sólida nas buscas locais, com percepção positiva de
                  variedade, ambiente e experiência familiar.
                </p>
              </div>

              <div className="rating-bars" aria-hidden="true">
                <div>
                  <span>5</span>
                  <i style={{ "--fill": "92%" }}></i>
                </div>
                <div>
                  <span>4</span>
                  <i style={{ "--fill": "76%" }}></i>
                </div>
                <div>
                  <span>3</span>
                  <i style={{ "--fill": "32%" }}></i>
                </div>
                <div>
                  <span>2</span>
                  <i style={{ "--fill": "16%" }}></i>
                </div>
                <div>
                  <span>1</span>
                  <i style={{ "--fill": "12%" }}></i>
                </div>
              </div>
            </article>

            <div className="review-grid">
              {reviewQuotesFresh.map((quote) => (
                <ReviewCard key={quote.text} quote={quote} />
              ))}
            </div>
          </div>

          <div className="review-grid" style={{ marginTop: "1rem" }}>
            {featuredReviewsFresh.map((quote) => (
              <ReviewCard key={quote.text} quote={quote} />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contato">
          <div className="contact-panel reveal">
            <div className="contact-copy">
              <span className="eyebrow">Contato e localização</span>
              <h2>Marca reforçada, cardápio organizado e ações rápidas para o cliente.</h2>
              <p>
                O fechamento da página mantém foco em ligação, rotas e acesso
                aos canais digitais, agora dentro da nova identidade preto e
                amarelo.
              </p>
            </div>

            <p>(47) 3013-1212 • cardapiodigital.io • linktr.ee</p>

            <div className="contact-grid">
              {contactCardsFresh.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
              <HoursCard />
            </div>

            <div className="contact-actions">
              <a className="button button-accent" href={MAP_URL} target="_blank" rel="noreferrer">
                Abrir no mapa
              </a>
              <a className="button button-light" href={PHONE_URL}>
                Falar com a loja
              </a>
              <a className="button button-outline" href={LINKTREE_URL} target="_blank" rel="noreferrer">
                Linktree
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>
          Big Hall Lanchonete • Joinville, SC • Cardápio completo, drinks,
          porções e ambiente para todos.
        </p>
        <p>© {new Date().getFullYear()} Big Hall. Todos os direitos reservados.</p>
      </footer>

      {/* MOBILE BAR */}
      <div className="mobile-bar">
        <a href={PHONE_URL}>Ligar</a>
        <a href={MAP_URL} target="_blank" rel="noreferrer">
          Rotas
        </a>
        <a href="#menu-completo">Cardápio</a>
      </div>
    </div>
  );
}

/* Renderização */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

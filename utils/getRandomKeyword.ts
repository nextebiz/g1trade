const keywords = [
  "G1 Garlic for Sale",
  "Sell G1 Garlic",
  "where are g1 garlic buyers",
  "where are g1 garlic sellers",
  "where can i sell g1 garlic",
  "benefits of g1 garlic",
  "how to export g1 garlic",
  "export g1 garlic",
  "export garlic",
  "large g1 garlic",
  "Buy G1 Garlic",
  "G1 Sell",
  "Buy G1",
  "G1 Sale",
  "sale G1",
  "sale g1 garlic",
  "sell garlic",
  "order g1",
  "g1 garlic selling",
  "i want to sell g1 garlic",
  "i want to buy g1 garlic",
  "how to buy g1 garlic",
  "how to sell g1 garlic",
  "where to sell g1 garlic",
  "g1 garlic mandi",
  "g1 garlic price",
  "g1 garlic in pakistan",
  "where to sell g1 garlic",
  "how can i buy g1 garlic",
  "g1 garlic sellers",
  "g1 garlic buyers",
  "g1 garlic export",
  "order g1 garlic",
  "online g1 garlic sell",
  "sell g1 garlic online",
  "g1 garlic",
  "g1",
  "garlic g1",
  "invest in g1 garlic",
];
const getRandomKeyword = () => {
  const newIndex = Math.floor(Math.random() * keywords.length);
  const keyword = keywords[newIndex];
  return keyword;
};

export default getRandomKeyword;
const colors = [
  "#FBFFB9",
  "#FDD692",
  "#EC7357",
  "#C5E99B",
  "#8FBC94",
  "#a5dff9",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

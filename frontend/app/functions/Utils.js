export const capitalize = (word) => {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
};

export const splitQuestion = (question) => {
  return question.replace(/\s+/g, "-");
};

export const joinQuestion = (question) => {
  return question.split("-").join(" ");
};

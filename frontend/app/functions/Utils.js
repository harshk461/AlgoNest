export const capitalize = (word) => {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
};


export const joinQuestion = (question) => {
  return question.split("-").map((item)=>capitalize(item)).join(" ");
};

export const makeQuestionLink=(question)=>{
  return question.split(" ").map((item)=>item.toLowerCase()).join("-");
}
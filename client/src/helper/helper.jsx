// give position based on marks
export const getPositionFromIndex = (index) => {
  const positions = ["1st", "2nd", "3rd", "4th", "5th"];

  return positions[index] || `${index + 1}th`;
};

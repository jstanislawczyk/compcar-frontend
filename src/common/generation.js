export const buildProductionDateInformation = (startYear, endYear) => {
  const endYearInfo = endYear || 'still produced';

  return `${startYear} - ${endYearInfo}`;
};

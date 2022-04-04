export const buildGeneralProductionDateInformation = (cars) => {
  if (cars.length === 0) {
    return 'No data';
  }

  let startYear = cars[0].startYear;
  let endYear = cars[0].endYear;

  for (const car of cars) {
    startYear = getStartYear(startYear, car);
    endYear = getEndYear(endYear, car);
  }

  return buildProductionDateInformation(startYear, endYear);
};

export const buildProductionDateInformation = (startYear, endYear) => {
  const endYearInfo = endYear || 'still produced';

  return `${startYear} - ${endYearInfo}`;
};

const getStartYear = (startYear, car) => {
  if (startYear > car.startYear) {
    startYear = car.startYear;
  }

  return startYear;
};

const getEndYear = (endYear, car) => {
  if (!car.endYear) {
    endYear = undefined;
  } else if (endYear < car.endYear) {
    endYear = car.endYear;
  }

  return endYear;
};

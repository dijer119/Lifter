// Filter values typed on weight input
// only numbers or "," allowed.
export const filterTypedValue = value => {
  const newValue = [...value].filter(char => parseInt(char, 10) || char === '0' || char === ',');
  return newValue.join('');
};

// Remove " kg" and using proper JSON for firebase
export const formatForFirebase = value => {
  return JSON.stringify(value.replace('kg', ''));
};

// When retrieving user lifts check if there
// are already " kg" on the weight, if not, add it.
export const userLiftsWithKilos = value => {
  const retrievedLifts = { ...value };
  const liftsWithKilos = Object.keys(retrievedLifts)
    .map(key => {
      if (`${retrievedLifts[key]}`.includes('kg')) {
        return { [key]: `${retrievedLifts[key]}` };
      } else {
        return { [key]: `${retrievedLifts[key]}kg` };
      }
    })
    .reduce((prev, next) => {
      return { ...prev, ...next };
    });

  return liftsWithKilos;
};

export const addKilosToValue = value => {
  return [...value, 'kg'].join('');
};

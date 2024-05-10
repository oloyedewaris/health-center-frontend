export const getAgeApp = birthDate => `${Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)} years old`

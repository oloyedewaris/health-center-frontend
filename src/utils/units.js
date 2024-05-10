const getPublicHealthDay = () => {
  const today = new Date().getDay();
  switch (today) {
    case 1:
      return 'HBSS clinics';
    case 2:
      return 'Infant welfare clinic';
    case 3:
      return 'Ante-natal booking  clinic';
    case 4:
      return 'Immunization clinics';
    case 5:
      return 'Ante-natal clinics';
    default:
      break;
  }
}

export default [
  {
    unit: "Nursing unit",
    subUnits: [
      'OPD',
      'Emergency ward',
      'Female ward',
      'Male ward',
      `Public health (${getPublicHealthDay()})`,
      'Family planning',
      'Maternity ward',
      'Operating room theatre',
      'Dressing room',
      'Cash point',
    ]
  },
  {
    unit: "Consulting unit",
    subUnits: [
      'Emergency',
      'General outpatient clinic',
      'Hypertensive clinic',
      'Antenatal clinic',
      'Eye clinic',
      'Physiotherapy clinic',
      'Cash point',
    ]
  },
  {
    unit: "Pathology laboratory unit",
    subUnits: [
      'Reception',
      'Heamatology lab',
      'Chemical pathology lab',
      'Microbiology lab',
      'Cash point',
    ]
  },
  {
    unit: "Pharmacy unit",
    subUnits: [
      'Store and logistics',
      'Cash point',
      'Main pharmacy',
      'Drug production unit',
      'Pharmaceutical care/clinical pharmacy',
      'Pharmacy phase II',
    ]
  },
  {
    unit: "Medical record unit",
    subUnits: [
      'Record officer'
    ]
  },
  {
    unit: "Administration",
    subUnits: [
      'Admin officer'
    ]
  },
]
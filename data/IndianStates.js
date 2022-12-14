export const states = [
  { name: "Andaman & Nicobar Islands", code: "AN", start: 744101, end: 744304 },
  { name: "Andhra Pradesh", code: "AD", start: 507130, end: 535594 },
  { name: "Arunachal Pradesh", code: "AR", start: 790001, end: 792131 },
  { name: "Assam", code: "AS", start: 781001, end: 788931 },
  { name: "Bihar", code: "BR", start: 800001, end: 855117 },
  { name: "Chandigarh", code: "CH", start: 140119, end: 160102 },
  { name: "Chattisgarh", code: "CG", start: 490001, end: 497778 },
  { name: "Dadra Nagar Haveli", code: "DNH", start: 396193, end: 396240 },
  { name: "Daman Diu", code: "DD", start: 362520, end: 396220 },
  { name: "Delhi", code: "DL", start: 110001, end: 110097 },
  { name: "Goa", code: "GA", start: 403001, end: 403806 },
  { name: "Gujarat", code: "GJ", start: 360001, end: 396590 },
  { name: "Haryana", code: "HR", start: 121001, end: 136156 },
  { name: "Himachal Pradesh", code: "HP", start: 171001, end: 177601 },
  { name: "Jammu Kashmir", code: "JK", start: 180001, end: 194404 },
  { name: "Jharkhand", code: "JH", start: 813208, end: 835325 },
  { name: "Karnataka", code: "KA", start: 560001, end: 591346 },
  { name: "Kerala", code: "KL", start: 670001, end: 695615 },
  { name: "Lakshadweep", code: "LD", start: 682551, end: 682559 },
  { name: "Madhya Pradesh", code: "MP", start: 450001, end: 488448 },
  { name: "Maharashtra", code: "MH", start: 400001, end: 445402 },
  { name: "Manipur", code: "MN", start: 795001, end: 795159 },
  { name: "Meghalaya", code: "ML", start: 783123, end: 794115 },
  { name: "Mizoram", code: "MZ", start: 796001, end: 796901 },
  { name: "Nagaland", code: "NL", start: 797001, end: 798627 },
  { name: "Odisha", code: "OD", start: 751001, end: 770076 },
  { name: "Pondicherry", code: "PY", start: 533464, end: 673310 },
  { name: "Punjab", code: "PB", start: 140001, end: 160104 },
  { name: "Rajasthan", code: "RJ", start: 301001, end: 345034 },
  { name: "Sikkim", code: "SK", start: 737101, end: 737139 },
  { name: "Tamil Nadu", code: "TN", start: 600001, end: 643253 },
  { name: "Telangana", code: "TS", start: 500001, end: 509412 },
  { name: "Tripura", code: "TR", start: 799001, end: 799290 },
  { name: "Uttar Pradesh", code: "UP", start: 201001, end: 285223 },
  { name: "Uttarakhand", code: "UK", start: 244712, end: 263680 },
  { name: "West Bengal", code: "WB", start: 700001, end: 743711 },
];

export const findStateFromPin = (pincode) =>
  states.find(({ start, end }) => pincode >= start && pincode <= end);

export const findStateFromCode = (code) =>
  states.find((state) => state.code === code);

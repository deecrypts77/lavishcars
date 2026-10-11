export type Brand = { name: string; logo: string; width: number; height: number };

/** Marques shown in the lavishcars.com brand marquee. Logos are white silhouettes in /public/images/brands. */
export const brands: Brand[] = [
  { name: "Lamborghini", logo: "/images/brands/lamborghini.png", width: 114, height: 128 },
  { name: "Ferrari", logo: "/images/brands/ferrari.png", width: 85, height: 133 },
  { name: "Bugatti", logo: "/images/brands/bugatti.png", width: 207, height: 105 },
  { name: "McLaren", logo: "/images/brands/mclaren.png", width: 192, height: 29 },
  { name: "Porsche", logo: "/images/brands/porsche.png", width: 105, height: 135 },
  { name: "Aston Martin", logo: "/images/brands/aston-martin.png", width: 211, height: 49 },
  { name: "Range Rover", logo: "/images/brands/range-rover.png", width: 217, height: 61 },
  { name: "BMW", logo: "/images/brands/bmw.png", width: 133, height: 131 },
  { name: "Audi", logo: "/images/brands/audi.png", width: 219, height: 76 },
  { name: "Cadillac", logo: "/images/brands/cadillac.png", width: 198, height: 135 },
  { name: "Chevrolet", logo: "/images/brands/chevrolet.png", width: 217, height: 73 },
  { name: "Tesla", logo: "/images/brands/tesla.png", width: 101, height: 132 },
];

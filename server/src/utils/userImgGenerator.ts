import sharp from 'sharp';

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 80%)`;
};

export const createImage = async (initial: string) => {
  //Get random bg color
  const color = getRandomColor();

  //Create + optimize image
  const svgImg = `<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" font-size="60" dy=".3em" fill="#fff" text-anchor="middle">${initial.toUpperCase()}</text></svg>`;
  const imgBuffer = await sharp(Buffer.from(svgImg))
    .resize(150, 150)
    .webp({ quality: 90 })
    .toBuffer();

  return imgBuffer;
};

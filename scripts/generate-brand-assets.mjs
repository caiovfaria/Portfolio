import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = "public/brand/cvf-logo.png";

async function png(size, output) {
  await sharp(source)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

await Promise.all([
  png(16, "public/favicon-cvf-16.png"),
  png(32, "public/favicon-cvf-32.png"),
  png(64, "public/favicon-cvf-64.png"),
  png(16, "public/favicon-cv-16.png"),
  png(32, "public/favicon-cv-32.png"),
  png(64, "public/favicon-cv-64.png"),
  png(16, "public/favicon-16x16.png"),
  png(32, "public/favicon-32x32.png"),
  png(180, "public/apple-touch-icon-cvf.png"),
  png(180, "public/apple-touch-icon-cv.png"),
]);

const faviconPng = await sharp(source)
  .resize(256, 256, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toBuffer();

const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(0, 6);
icoHeader.writeUInt8(0, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
const faviconIco = Buffer.concat([icoHeader, faviconPng]);

await Promise.all([
  writeFile("public/favicon-cvf.ico", faviconIco),
  writeFile("public/favicon-cv.ico", faviconIco),
  writeFile("public/favicon.ico", faviconIco),
]);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 4, g: 5, b: 4, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(source)
        .resize(560, 560, { fit: "contain" })
        .png()
        .toBuffer(),
      left: 320,
      top: 35,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile("public/og.png");

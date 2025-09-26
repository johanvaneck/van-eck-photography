import sharp from 'sharp';

// Converts SVG string to PNG Buffer
export async function svgToPng(svg: string, width = 1240, height = 1754): Promise<Buffer> {
    return sharp(Buffer.from(svg))
        .resize(width, height)
        .png()
        .toBuffer();
}

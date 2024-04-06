import { imageSize } from "../global/typedef";

export default async function getImageSize(imgBlob:Blob):Promise<imageSize>{
    const bmp = await createImageBitmap(imgBlob);
    const { width, height } = bmp;
    bmp.close(); // free memory
    console.log(width, height);
    return {width,height}
}

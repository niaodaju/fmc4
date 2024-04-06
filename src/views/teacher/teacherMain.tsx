
import React, { useState, useEffect } from 'react';
import '../../global/typedef'
import FabricCanvas  from '../../utils/FabricCanvas';
import getImageSize from '../../utils/image';

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import ImgCrop from '../imagecrop/imgCrop';

const TeacherMain: React.FC = () => {
  const [imageblob, setImageblob] = useState<Blob[]>([]);


  const handlePaste = async (event: any) => {
    console.log('paste is called')
    try {
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        return;
      }

      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.find(type => type.startsWith('image/'));

        if (imageTypes) {
          const blob = await clipboardItem.getType(imageTypes)
          var old = imageblob.slice()
          old.push(blob)
          setImageblob(old)

          // const url = URL.createObjectURL(blob);
          // console.log('url',url)
          // var imageold = imageSrc.slice()
          // imageold.push({url,blob})
          // setImageSrc(imageold);
          break; // Assuming we need the first image
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div onPaste={handlePaste}>
      TeacherMain
      <ul>
        {
          imageblob.map((item:Blob, index) =>
          (<li key={index}>
            <img src={URL.createObjectURL(item)} alt="Pasted"/>
            <ImgCrop {...{imgurl:URL.createObjectURL(item)}}></ImgCrop>
          </li>))
        }
        {/* {imageSrc && <img src={imageSrc} alt="Pasted" />} */}
      </ul>
    </div>
  )
}

export default TeacherMain;
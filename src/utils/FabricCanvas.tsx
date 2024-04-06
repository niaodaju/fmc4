import React, { useRef, useEffect,useState, createRef} from 'react';
import { fabric } from 'fabric';
import getImageSize from './image';
import getRatio from './screen';

// export function FabricCanvas:React.FC<> = ()
interface Props {
  imgblob:Blob;
}

const  FabricCanvas: React.FC<Props> = ({imgblob}) => {
  const canvasRef=useRef(null)
  const imgid = useRef<HTMLImageElement>()

  const [canvas,setCanvas] = useState<fabric.Canvas|null>(null)
  const [cropRect,setCorpRect] = useState<fabric.Rect|null>(null)
  const [image,setImage] = useState<fabric.Image|null>(null)
  useEffect(()=>{
    if(canvas) return
    //获取屏幕缩放比率
    const ra = getRatio()
    console.log('ra',ra)
    //获取图像尺寸，初始化fabir canvas对象
    getImageSize(imgblob).then((value)=>{
        const tempCanvas = new fabric.Canvas(canvasRef.current,{
        backgroundColor:'orange',
        width:value.width,
        height:value.height
      })
      const url = URL.createObjectURL(imgblob);
      console.log(url)
      fabric.Image.fromURL(url, function(oImg) {
        
      //   console.log('oimg',oImg)
      //   oImg.clipPath = new fabric.Rect({
      //     left:0,
      //     top:0,
      //     width:200,
      //     height:200
      // })
        // oImg.lockSkewingX =  true
        // oImg.lockScalingY =  true

        tempCanvas.add(oImg)
        setImage(oImg)

        // let rect = new fabric.Rect({left:0,top:0,width:value.width,height:value.height,
        // fill:'yellow',opacity: 1})
        // tempCanvas.add(rect)
        // setCorpRect(rect)

      });
      setCanvas(tempCanvas)
      }
      )
    return ()=>{
    }
   },
   [canvas,canvasRef,imgblob]
   )

   const handleSaveCropedImage  = ()=>{
    if(image && canvas)
    {
      image.clipPath = new fabric.Rect({
        left:0,
        top:0,
        width:100,
        height:100
      })
     canvas.renderAll();
    }

    // console.log('handleSaveCropedImage')
    // console.log('croprect',cropRect)
    // if(image && canvas && cropRect){
    //   image.clipPath = cropRect
    //   canvas.remove(cropRect)
    //   canvas.renderAll()
    //   }
   }
  return (<div>
    <canvas ref={canvasRef}></canvas>
    <button onClick={handleSaveCropedImage}>剪切保存</button>
  </div>)
}
export default FabricCanvas

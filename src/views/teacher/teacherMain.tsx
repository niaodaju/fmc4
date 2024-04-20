
import React, { useState, useEffect } from 'react';
import '../../global/typedef'
import FabricCanvas from '../../utils/FabricCanvas';
import getImageSize from '../../utils/image';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import ImgCrop from '../imagecrop/imgCrop';
import { Modal, List } from "antd";
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { DragDropContext } from '@hello-pangea/dnd';
import styled from '@emotion/styled';


const Container = styled.div`
  display: flex;
  user-select: none;
`;

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const TeacherMain: React.FC = () => {
  const [imageblob, setImageblob] = useState<Blob[]>([]);
  const [obj1, setObj1] = useState<any>({ a: 1 });


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

          // const url = URL.createObjectSURL(blob);
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


  const handleClick = async (event: any) => {
    const b = 33
    setObj1({ b, })
    setTimeout(() => {
      console.log(obj1)
    }, 0);
  }
  const handleClick2 = async (event: any) => {
    console.log(obj1)
  }

  const handleOnDrageStart = (start: DragStart): void => {
    const id: string = start.draggableId;
    const selected: Id | undefined | null = this.state.selectedTaskIds.find(
      (taskId: Id): boolean => taskId === id,
    );

    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      this.unselectAll();
    }
    this.setState({
      draggingTaskId: start.draggableId,
    });
  };

  const handleOnDragEnd = (result: DropResult): void => {

  };
  return (
    <div onPaste={handlePaste}>
      TeacherMain
      <button onClick={handleClick}>上传</button>
      <DragDropContext
        onDragStart={handleOnDrageStart}
        onDragEnd={handleOnDragEnd}
      >
        <Container>
          <ul >
            {
              imageblob.map((item, index) => (
                <li >
                  <img src={URL.createObjectURL(item)} alt="akdk" />
                  <ImgCrop imgurl={URL.createObjectURL(item)}></ImgCrop>
                </li>
              )
              )
            }

          </ul>
        </Container>
      </DragDropContext>
    </div>
  )
}

export default TeacherMain;
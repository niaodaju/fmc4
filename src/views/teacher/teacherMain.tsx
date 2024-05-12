import React, { useState, useEffect } from 'react';
import '../../global/typedef';
import FabricCanvas from '../../utils/FabricCanvas';
import getImageSize from '../../utils/image';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImgCrop from '../imagecrop/imgCrop';
import { Button, Modal, List, Message } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { CheckCard } from '@ant-design/pro-components';
import Question from '../question/ui';
import { Quiz } from '../../global/typedef';
import qstore from './data';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const TeacherMain: React.FC = () => {
  const [quesList, setQuesList] = useState<Quiz[]>([]);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const handlePaste = async (event: any) => {
    console.log('paste is called');
    try {
      if (!navigator.clipboard) {
        console.error('Clipboard API not available');
        return;
      }

      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.find((type) =>
          type.startsWith('image/')
        );

        if (imageTypes) {
          const blob = await clipboardItem.getType(imageTypes);
          var old = quesList.slice();
          const nquiz: Quiz = {
            id: 'id' + old.length,
            question: blob,
            answer: blob,
            AnswerChoice: 0,
            subject: 'subject',
            grade: 'grade',
            chapter: URL.createObjectURL(blob),
            tips: ['tips'],
            difficulty: 1,
          };
          old.push(nquiz);
          setQuesList(old);

          break; // Assuming we need the first image
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleUpLoad = async (event: any) => {
    console.log(quesList[0].subject);
  };
  const handleDelete = async (event: any) => {
    console.log(obj1);
  };

  const handleListChange = (value: any) => {
    console.log(value);
    setSelectedList(value);
  };
  return (
    <div onPaste={handlePaste}>
      TeacherMain
      <Button onClick={handleDelete}>删除</Button>
      <Button onClick={handleUpLoad}>上传</Button>
      <CheckCard.Group
        multiple
        style={{ width: '100%' }}
        onChange={handleListChange}
      >
        {quesList.map((item, index) => (
          <CheckCard value={index} style={{ width: '100%' }} key={index}>
            <Question value={item} quiz={item} />
            {/* <img src={URL.createObjectURL(item.question)} alt="akdk" /> */}
            {/* <ImgCrop imgurl={URL.createObjectURL(item.question)}></ImgCrop> */}
          </CheckCard>
        ))}
      </CheckCard.Group>
    </div>
  );
};

export default TeacherMain;

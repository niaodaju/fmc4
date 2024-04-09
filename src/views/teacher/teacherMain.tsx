
import React, { useState, useEffect } from 'react';
import '../../global/typedef'
import FabricCanvas  from '../../utils/FabricCanvas';
import getImageSize from '../../utils/image';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import ImgCrop from '../imagecrop/imgCrop';
import { Modal,List } from "antd";
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';

const columns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',

  },
  {
    title: '编号',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '题目',
    dataIndex: 'age',
    render: () => (<div>diy render</div>),
  },
  {
    title: '答案',
    dataIndex: 'address',
  },
];

const TeacherMain: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

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

            // {/* <ImgCrop {...{imgurl:URL.createObjectURL(item)}}></ImgCrop> */}

  const handleUpLoad = ()=>{
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAfterClose =()=>{
    console.log('handleAfterClose')
  }
  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <div onPaste={handlePaste}>
      <button onClick={handleUpLoad}>上传</button>
      <DragSortTable
          headerTitle="题目录入"
          columns={columns}
          rowKey="key"
          search={false}
          pagination={false}
          dataSource={imageblob}
          onDragSortEnd={handleDragSortEnd}
      />
    </div>
  )
}

export default TeacherMain;
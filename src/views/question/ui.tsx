import React, { useEffect, useState } from 'react';
import { Rate, Select, Mentions } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';
import ImgCrop from '../imagecrop/imgCrop';
import { Quiz } from '../../global/typedef';
export default function Question({ value }: { value: Quiz }) {
  const [mention, setMention] = useState('hello world');
  useEffect(() => {
    console.log(typeof value);
    console.log('Question', value);
  }, []);
  return (
    <div>
      <Select
        tabIndex="-1"
        defaultValue="math"
        style={{ width: 120 }}
        onChange={(val) => {
          console.log(val);
          value.subject = val;
        }}
        options={[
          { value: 'math', label: '数学' },
          { value: 'phy', label: '物理' },
        ]}
      />
      <Select
        tabIndex="-1"
        defaultValue="g7"
        style={{ width: 120 }}
        onChange={(val) => {
          console.log(val);
          value.grade = val;
        }}
        options={[
          { value: 'g7', label: '七年级' },
          { value: 'g8', label: '八年级' },
          { value: 'g9', label: '九年级' },
        ]}
      />
      <Select
        tabIndex="-1"
        defaultValue="ch1"
        style={{ width: 120 }}
        onChange={(val) => {
          console.log(val);
          value.chapter = val;
        }}
        options={[
          {
            label: <span>manager</span>,
            title: 'manager',
            options: [
              { label: <span>Jack</span>, value: 'Jack' },
              { label: <span>Lucy</span>, value: 'Lucy' },
            ],
          },
          {
            label: <span>engineer</span>,
            title: 'engineer',
            options: [
              { label: <span>Chloe</span>, value: 'Chloe' },
              { label: <span>Lucas</span>, value: 'Lucas' },
            ],
          },
        ]}
      />
      <Mentions value={mention} onChange={setMention} allowClear rows={3} />
      <Rate
        count={3}
        onChange={(val) => {
          console.log(val);
          value.difficulty = val;
        }}
      ></Rate>
      {/* <img src={value.chapter} alt="akdk" /> */}

      {/* <image imgurl={URL.createObjectURL(value.question)} /> */}
      <ImgCrop imgurl={value.chapter} />
    </div>
  );
}

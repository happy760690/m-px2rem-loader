import React from 'react';
import ReactDom from 'react-dom';
import './m-flexible';
import './index.css';
import 'antd/dist/antd.css';
import {Button} from 'antd';

ReactDom.render(<Button type="primary">按钮</Button>,document.getElementById('root'))
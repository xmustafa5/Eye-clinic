import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css';
const Loading = (props) => (
  <div className='loading'>
        <ReactLoading type={props.bars
} color='black'/>
        {/* <ReactLoading type={spokes} color='black' />
        <ReactLoading type={spokes} color='black' /> */}
  </div>
);

export default Loading;

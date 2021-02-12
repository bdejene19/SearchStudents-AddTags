import React from 'react';
import CommentTag from './CommentTag';

export default function TagContainer(props) {
    return (
        <div className='tags-container'>
            {props.tagArray.map((tag) => <CommentTag tag={tag}></CommentTag>)}
        </div>
    )
}

import React from 'react'
import'./style.css'

// component: Top 3 List Item 컴포넌트
export default function Top3Item() {
  return (
    <div className='top-3-list-item'>
      <div className='top-3-list-item-main-box'>
        <div className='top-3-list-item-top'>
            <div className='top-3-list-item-profile-box'>
                <div className='top-3-list-profile-image' style={{backgroundImage: `url()`}}></div>
            </div>
            <div className='top-3-list-item-write-box'>
                <div className='top-3-list-item-nickname'>{'김민수'}</div>
                <div className='top-3-list-item-write-date'>{'2025.04.02'}</div>
            </div>
        </div>
        <div className='top-3-list-item-middle'>
            <div className='top-3-list-item-tile'>{'123'}</div>
            <div className='top-3-list-item-content'>{'123'}</div>
        </div>
        <div className='top-3-list-item-bottom'>
            <div className='top-3-list-item-counts'>
                {`댓글 0 . 좋아요 0 . 조회수 0`}
            </div>
        </div>
      </div>
    </div>
  )
}

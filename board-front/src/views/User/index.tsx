import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import DefaultProfileImage from 'assets/image/default-profile-image.png'
import { useParams } from 'react-router-dom';

export default function User() {

  const {userEmail} = useParams();

  const UserTop = () =>{

    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const [isMyPage, setMypage] = useState<boolean>(true);
    const [isNicknameChange, setNicknameChange] = useState<boolean>(false);
    const [nickname, setNickname] = useState<string>('');
    const [changeNickname, setChangeNickname] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const onProfileBoxClickHandler = () =>{
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    const onNicknameEditButtonClickHandler = () =>{
      setChangeNickname(nickname);
      setNicknameChange(!isNicknameChange);
    }
    
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      if(!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }

    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setChangeNickname(value);
    }

    useEffect(()=>{
      if(!userEmail) return;
      setNickname('닉네임123');
      setProfileImage('');

    }, [userEmail])

    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ? 
            <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
              {profileImage ! == null ?
              <div className='user-top-profile-image' style={{backgroundImage: `url(${profileImage })`}}></div> :
              
                <div className='icon-box-large'>
                  <div className='icon image-box-white-icon'></div>
                </div>
              
              }
              <input ref={imageInputRef} type="file" accept='image/*' style={{display: 'none'}} onChange={onProfileImageChangeHandler}/>
            </div> 
            :
            <div className='user-top-profile-image-box' style={{backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})`}}></div>
          }
          
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ? 
              <>
              { isNicknameChange ? 
                <input className='user-top-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/> : 
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              
            </div>
            <div className='user-top-info-email'>{'email23123423@naver.com'}</div>
          </div>
        </div>
      </div>
    )
  }

    const UserBottom = () =>{

    return(
      <div>

      </div>
    )
  }

  return (
    <div>
      <UserTop />
      <UserBottom />
    </div>
  )
}

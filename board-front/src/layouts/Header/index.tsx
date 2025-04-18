import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

export default function Header() {

  // state: 로그인 유저 상태
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
  // state: cookie 상태
  const [cookies, setCookies] = useCookies();
  // state: 로그인 상태
  const [isLogin, setIsLogin] = useState<boolean>(false);


  // function: 네비게이트 함수
  const navigate = useNavigate();

  // event handler: 로고 클릭 이벤트 처리 함수
  const onLogoClickHandler = () =>{
    navigate(MAIN_PATH())
  }

  // component: 검색 버튼 컴포넌트
  const SearchButton = () =>{

    // state: 검색 버튼 요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    // state: 검색 버튼 상태
    const [status, setStatus] = useState<boolean>(false);
    // state: 검색어 상태
    const [word, setWord] = useState<string>('');
    // state: 검색어 path variable 상태
    const {searchWord} = useParams();

    // event handler: 검색어 변경 클릭 이벤트 함수
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const value= event.target.value;
      setWord(value);
    }

    // event handler: 검색어 변경 클릭 이벤트 함수
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!searchButtonRef.current) return;
      searchButtonRef.current.click();
    }

    // event handler : 검색 아이콘 클릭 이벤트 함수
    const onSearchButtonClickHandler = () =>{
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }

    // effect : 검색어 path variable 변경될때마다 실행될 함수
    useEffect(()=>{
      if(searchWord){
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord])

    if(!status){
      // render: 검색 버튼 컴포넌트(클릭 false상태)
      return (
        <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      );
    }

    return(
      // render: 검색 버튼 컴포넌트(클릭 true상태)
      <div className='header-search-input-box'>
        <input className='header-search-input' type="text" placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  }

  // component: 로그인 또는 마이페이지 버튼 컴포넌트
  const MyPageButton = () =>{

    // state: 유저 이메일 path variable 상태
    const {userEmail} = useParams();

    // event handler: 마이페이지 버튼 클릭 이벤트 처리함수
    const onMyPageButtonClickHandler = () =>{
      if(!loginUser) return;
      const {email} = loginUser;

      navigate(USER_PATH(email));
    }
    // event handler: 마이페이지 버튼 클릭 이벤트 처리함수
    const onSignOutButtonClickHandler = () =>{
      resetLoginUser();
      navigate(MAIN_PATH());
    }


    // event handler: 로그인 버튼 클릭 이벤트 처리함수
    const onSignInButtonClickHandler = () =>{
      navigate(AUTH_PATH());
    }

    // 로그아웃
    if(isLogin && userEmail === loginUser?.email)
      return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;
    if(isLogin)
      // 마이페이지 버튼
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
      // 로그인
      return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;

      
  
  }

  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'HJH Board'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
          <MyPageButton />
        </div>
      </div>
    </div>
  )
}

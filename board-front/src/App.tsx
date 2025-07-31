import Footer from 'layouts/Footer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { MAIN_PATH } from 'constant';
import { AUTH_PATH } from 'constant';
import { SEARCH_PATH } from 'constant';
import { USER_PATH } from 'constant';
import { BOARD_PATH } from 'constant';
import { BOARD_WRITE_PATH } from 'constant';
import { BOARD_DETAIL_PATH } from 'constant';
import { BOARD_UPDATE_PATH } from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';



function App() {

  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  const [cookies, setCookie] = useCookies();

  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null)=>{
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'AF' || code === 'NU' || code === 'DBE'){
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);

  }

  useEffect(()=>{
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  //description: 메인화면 : '/'
  //description: 로그인 + 회원기입 : '/auth'
  //description: 검색화면 : '/search/:word'
  //description: 유저 페이지 : '/user/:userEmail'
  //description: 게시물 상세보기 : '/board/detail/:boardNumber'
  //description: 게시물 작성하기 : '/board/write'
  //description: 게시물 수정하기 : '/board/update/:boardNumber'
  return (
    <Routes>
      <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<UserP />} />
          <Route path={BOARD_PATH()}>
              <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
              <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
              <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          </Route>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Route>
    </Routes>
  );
}

export default App;

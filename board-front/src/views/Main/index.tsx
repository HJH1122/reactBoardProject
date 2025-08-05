import React, { useEffect, useState } from 'react'
import './style.css'
import { latestBoardListMock, top3BoardListMock } from 'mocks'
import Top3Item from 'components/Top3Item'
import { BoardListItem } from 'types/interface'
import BoardItem from 'components/BoardItem'
import Pagination from 'components/Pagination'
import { useNavigate } from 'react-router-dom'
import { SEARCH_PATH } from 'constant'
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis'
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board'
import { ResponseDto } from 'apis/response'
import { usePagination } from 'hooks'
import { GetPopularListResponseDto } from 'apis/response/search'

export default function Main() {

  const navigate = useNavigate();

  const MainTop = () =>{

    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) =>{
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const {top3List} = responseBody as GetTop3BoardListResponseDto;

        if (!top3List || !Array.isArray(top3List)) {
          console.warn('top3List is undefined or not an array', top3List);
          return;
         }

      setTop3BoardList(top3List);
    }

    useEffect(()=>{
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, [])

    return(
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'게시판에 오신걸 환영합니다'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 TOP 3 게시글'}</div>
            <div className='main-top-contents'>
              {Array.isArray(top3BoardList) && top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MainBottom = () =>{

    const {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList,
    } = usePagination<BoardListItem>(5);
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
        const {code } = responseBody;

        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU') return;

        const {latestList} = responseBody as GetLatestBoardListResponseDto;

        setTotalList(latestList);
    }

    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
        const {code } = responseBody;

        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU') return;

        const {popularWordList} = responseBody as GetPopularListResponseDto;

        setPopularWordList(popularWordList);
    }

    const onPopularWordClickHandler = (word: string) =>{
      console.log("검색어 클릭:", word); // 클릭된 검색어 출력
  const searchPath = SEARCH_PATH(word); // 검색 경로 생성
  console.log("검색 경로:", searchPath); // 생성된 검색 경로 출력
      navigate(SEARCH_PATH(word));
    }

    useEffect(()=>{
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, [])

    
    return(
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}
              
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-box'>
                  <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge' onClick={()=>onPopularWordClickHandler(word)}>{word}</div>)}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            <Pagination 
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
          </div>
        </div>
      </div>
    )
  }


  return (

    <>
      <MainTop />
      <MainBottom />
    </>
  )
}

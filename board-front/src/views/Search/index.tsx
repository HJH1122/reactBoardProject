import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { SEARCH_PATH } from 'constant';
import Pagination from 'components/Pagination';
import { getRelationListRequest, getSearchBoardListRequest } from 'apis';
import { GetSearchBoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetRelationListResponseDto } from 'apis/response/search';

export default function Search() {

  const {searchWord} = useParams();
  console.log("현재 검색어 (URL 파라미터):", searchWord);

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

  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
  const [count, setCount] = useState<number>(2);
  const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);
  const [relativeWordList, setRelationWordList] = useState<string[]>([]);

  const navigate = useNavigate();

  const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto | null) =>{
    console.log("검색 응답:", responseBody);  // 응답 로그 추가
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') return;

    if (!searchWord) return;
    const {searchList} = responseBody as GetSearchBoardListResponseDto;
      if (!searchList) {
    setTotalList([]);
    setCount(0);
    return;
  }

  setTotalList(searchList);
  setCount(searchList.length);
  setPreSearchWord(searchWord);
  }

  const getRelationListResponse = (responseBody: GetRelationListResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') return;

    const {relativeWordList} = responseBody as GetRelationListResponseDto;
    setRelationWordList(relativeWordList);

  }

  const onRelationWordClickHandler = (word: string) =>{
    navigate(SEARCH_PATH(word));
  }

  useEffect(()=>{
    if(!searchWord) return;
    getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
    getRelationListRequest(searchWord).then(getRelationListResponse);
  }, [searchWord])

  if(!searchWord) return (<></>)
  return (
    <div id='search-wrapper'>
      <div className='search-container'>
        <div className='search-title-box'>
          <div className='search-title'><span className='emphasis'>{searchWord}</span>{'에 대한 검색결과 입니다.'}</div>
          <div className='search-content'>{count}</div>
        </div>
        <div className='search-contents-box'>
          {count === 0 ?
          <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
          <div className='search-contents'>{viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}</div>
          }
          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'>{'관련 검색어'}</div>

                  {relativeWordList.length === 0 ? 
                    <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div> :
                    <div className='search-relation-card-contents'>
                    {relativeWordList.map(word => <div className='word-badge' onClick={()=>onRelationWordClickHandler(word)}>{word}</div>)}
                    </div>
                  }

              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
          {count !== 0 &&  
          <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
          />}
        </div>
      </div>
    </div>
  )
}

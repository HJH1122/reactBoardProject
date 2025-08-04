import { useEffect, useState } from "react"

const usePagination = <T>(countPerPage: number) =>{
    // state: 전체 객체 리스트 상태
    const [ totalList, setTotalList ] = useState<T[]>([]);

    //보여줄 객체 리스트
    const [ viewList, setViewList ] = useState<T[]>([]);

    //현재 페이지 번호 상태
    const [ currentPage, setCurrentPage ] = useState<number>(1);

    //전체 페이지 번호리스트 상태
    const [ totalPageList, setTotalPageList ] = useState<number[]>([1]);

    //보여줄 페이지 번호리스트 상태
    const [ viewPageList, setViewPageList ] = useState<number[]>([1]);

    //현재 섹션 상태
    const [ currentSection, setCurrentSection ] = useState<number>(1);

    //전체 섹션 상태
    const [ totalSection, setTotalSection ] = useState<number>(1);


    const setView = () =>{
        const FIRST_INDEX = countPerPage * (currentPage - 1);
        const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
        const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
        setViewList(viewList);
    }

    const setViewPage = () =>{
        const FIRST_INDEX = 10 * (currentSection - 1);
        const LAST_INDEX = totalPageList.length >  10 * currentSection ? 10 * currentSection : totalPageList.length;
        const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
        setViewPageList(viewPageList);
    }

    useEffect(()=>{
        const totalPage = Math.ceil(totalList.length / countPerPage);
        const totalPageList: number[] = [];
        for(let page = 1; page <= totalPage; page++) totalPageList.push(page);
        setTotalPageList(totalPageList);

        const totalSection = Math.ceil(totalList.length / (countPerPage * 10));
        setTotalSection(totalSection);

        setCurrentPage(1);
        setCurrentSection(1);

        setView();
        setViewPage();
    }, [totalList]);

    useEffect(setView, [currentPage]);
    useEffect(setViewPage, [currentPage]);

    return{
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList,
    };

};

export default usePagination;
package com.hjh.board_back.service.implement;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.dto.response.board.GetTop3BoardListResponseDto;
import com.hjh.board_back.dto.response.search.GetPopularListResponseDto;
import com.hjh.board_back.entity.BoardListViewEntity;
import com.hjh.board_back.repository.SearchLogRepository;
import com.hjh.board_back.repository.resultSet.GetPopularListResultSet;
import com.hjh.board_back.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService{

    private final SearchLogRepository searchLogRepository;
    
    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
           
        List<GetPopularListResultSet> resultSets = new ArrayList<>(); 
        
        try{

            resultSets = searchLogRepository.getPopularList();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }
        return GetPopularListResponseDto.success(resultSets);
    
    }

    
    
}

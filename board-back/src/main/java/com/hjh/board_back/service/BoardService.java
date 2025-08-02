package com.hjh.board_back.service;

import org.springframework.http.ResponseEntity;

import com.hjh.board_back.dto.request.board.PostBoardRequestDto;
import com.hjh.board_back.dto.request.board.PostCommentResquestDto;
import com.hjh.board_back.dto.response.board.GetBoardResponseDto;
import com.hjh.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.hjh.board_back.dto.response.board.PostBoardResponseDto;
import com.hjh.board_back.dto.response.board.PutFavoriteResponseDto;
import com.hjh.board_back.dto.response.board.PostCommentResponseDto;
import com.hjh.board_back.dto.response.board.GetCommentListResponseDto;

public interface BoardService {
    
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
   
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email );
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentResquestDto dto, Integer boardNumber, String email );
    
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email );

}

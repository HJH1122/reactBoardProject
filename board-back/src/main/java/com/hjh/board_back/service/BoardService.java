package com.hjh.board_back.service;

import org.springframework.http.ResponseEntity;

import com.hjh.board_back.dto.request.board.PostBoardRequestDto;
import com.hjh.board_back.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email );

}

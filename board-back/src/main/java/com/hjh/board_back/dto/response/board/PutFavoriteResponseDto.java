package com.hjh.board_back.dto.response.board;

import java.net.ResponseCache;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hjh.board_back.common.ResponseCode;
import com.hjh.board_back.common.ResponseMessage;
import com.hjh.board_back.dto.response.ResponseDto;

public class PutFavoriteResponseDto extends ResponseDto{

    private PutFavoriteResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PutFavoriteResponseDto> success(){
        PutFavoriteResponseDto result = new PutFavoriteResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistUser(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
    
}

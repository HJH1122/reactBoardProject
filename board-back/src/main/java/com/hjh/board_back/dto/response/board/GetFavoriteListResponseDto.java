package com.hjh.board_back.dto.response.board;

import java.net.ResponseCache;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.repository.resultSet.GetFavoriteListResultSet;
import com.hjh.board_back.common.ResponseCode;
import com.hjh.board_back.common.ResponseMessage;
import com.hjh.board_back.dto.object.FavoriteListItem;

import lombok.Getter;

@Getter
public class GetFavoriteListResponseDto extends ResponseDto{

    private List<FavoriteListItem> favoriteList;

    private GetFavoriteListResponseDto(List<GetFavoriteListResultSet> resultSets){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = FavoriteListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetFavoriteListResponseDto> success(List<GetFavoriteListResultSet> resultSets){
        GetFavoriteListResponseDto result = new GetFavoriteListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    
}

package com.hjh.board_back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hjh.board_back.common.ResponseCode;
import com.hjh.board_back.common.ResponseMessage;
import com.hjh.board_back.dto.object.BoardListItem;
import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.entity.BoardEntity;
import com.hjh.board_back.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBaordListResponDto extends ResponseDto{

    private List<BoardListItem> latestList;

    private GetLatestBaordListResponDto(List<BoardListViewEntity> boardEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardEntities);
    }

    public static ResponseEntity<GetLatestBaordListResponDto> success(List<BoardListViewEntity> boardEntities){
        GetLatestBaordListResponDto result = new GetLatestBaordListResponDto(boardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    
}

package com.hjh.board_back.dto.response.board;

import java.net.ResponseCache;
import java.util.List;

import org.checkerframework.checker.units.qual.radians;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hjh.board_back.common.ResponseCode;
import com.hjh.board_back.common.ResponseMessage;
import com.hjh.board_back.dto.object.CommentListItem;
import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.repository.resultSet.GetCommentListResultSet;

import lombok.Getter;

@Getter
public class GetCommentListResponseDto extends ResponseDto{

    private List<CommentListItem> commentList;
    
    private GetCommentListResponseDto(List<GetCommentListResultSet> resultSets){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.commentList = CommentListItem.copyList(resultSets);

    }

    public static ResponseEntity<GetCommentListResponseDto> success(List<GetCommentListResultSet> resultSets){
        GetCommentListResponseDto result = new GetCommentListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);

    }
}

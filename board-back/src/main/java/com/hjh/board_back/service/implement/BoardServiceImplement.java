package com.hjh.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hjh.board_back.dto.request.board.PostBoardRequestDto;
import com.hjh.board_back.dto.request.board.PostCommentResquestDto;
import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.dto.response.board.GetBoardResponseDto;
import com.hjh.board_back.dto.response.board.GetCommentListResponseDto;
import com.hjh.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.hjh.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.hjh.board_back.dto.response.board.PostBoardResponseDto;
import com.hjh.board_back.dto.response.board.PostCommentResponseDto;
import com.hjh.board_back.dto.response.board.PutFavoriteResponseDto;
import com.hjh.board_back.entity.BoardEntity;
import com.hjh.board_back.entity.CommentEntity;
import com.hjh.board_back.entity.FavoriteEntity;
import com.hjh.board_back.entity.ImageEntity;
import com.hjh.board_back.repository.BoardRepository;
import com.hjh.board_back.repository.CommentRepository;
import com.hjh.board_back.repository.FavoriteRepository;
import com.hjh.board_back.repository.ImageRepository;
import com.hjh.board_back.repository.UserRepository;
import com.hjh.board_back.repository.resultSet.GetBoardResultSet;
import com.hjh.board_back.repository.resultSet.GetCommentListResultSet;
import com.hjh.board_back.repository.resultSet.GetFavoriteListResultSet;
import com.hjh.board_back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService{

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {
       
        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try{

            resultSet = boardRepository.getBoard(boardNumber);
            if(resultSet == null) return GetBoardResponseDto.notExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);



        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
        
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();
        
        try{

            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetFavoriteListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {
        
        List<GetCommentListResultSet> resultSets = new ArrayList<>();
        
        try{

            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetCommentListResponseDto.noExistBoard();

            resultSets = commentRepository.getCommentList(boardNumber);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }
        return GetCommentListResponseDto.success(resultSets);
    }




    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try{
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();
            
            for (String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);

            }
            imageRepository.saveAll(imageEntities);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }
        return PostBoardResponseDto.success();
    }

    
    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentResquestDto dto, Integer boardNumber, String email) {
       

        try{

            BoardEntity boardEntity = boardRepository.findByBoardNumber( boardNumber);
            if(boardEntity == null) return PostCommentResponseDto.noExistBoard();

            boolean existedUser = userRepository.existsByEmail( email);
            if(!existedUser) return PostCommentResponseDto.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostCommentResponseDto.success();
    }


    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
        try{

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PutFavoriteResponseDto.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if(favoriteEntity == null){
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            }
            else{
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }
            boardRepository.save(boardEntity);


        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PutFavoriteResponseDto.success();
    }

    @Override
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber) {
        
        try{

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) IncreaseViewCountResponseDto.notExistBoard();
            
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
            
        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return IncreaseViewCountResponseDto.success();
    }






    
    
}

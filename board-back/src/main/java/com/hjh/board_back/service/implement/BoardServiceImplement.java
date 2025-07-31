package com.hjh.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hjh.board_back.dto.request.board.PostBoardRequestDto;
import com.hjh.board_back.dto.response.ResponseDto;
import com.hjh.board_back.dto.response.board.PostBoardResponseDto;
import com.hjh.board_back.entity.BoardEntity;
import com.hjh.board_back.entity.ImageEntity;
import com.hjh.board_back.repository.BoardRepository;
import com.hjh.board_back.repository.ImageRepository;
import com.hjh.board_back.repository.UserRepository;
import com.hjh.board_back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService{

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

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

    
    
}

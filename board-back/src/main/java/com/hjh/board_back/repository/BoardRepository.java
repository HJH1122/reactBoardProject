package com.hjh.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hjh.board_back.entity.BoardEntity;
import com.hjh.board_back.repository.resultSet.GetBoardResultSet;
import java.util.List;


@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    
    boolean existsByBoardNumber(Integer boardNumber);

    BoardEntity findByBoardNumber(Integer boardNumber);

    @Query(
        value = 
        "SELECT "+
        "B.board_number AS boardNumber, "+
        "B.title AS title, "+
        "B.content AS content, "+
        "B.write_datetime AS writeDatetime, "+
        "B.writer_email AS writerEmail, " +
        "U.nickname AS writerNickname, "+
        "U.profile_image AS writerProfileImage "+
        "FROM board AS B"+
        "INNER JOIN user AS U"+
        "ON B.writer_email = U.email"+
        "WHERE board_number = ?1 ",
        nativeQuery = true

    )
    GetBoardResultSet getBoard(Integer boardNumber);

    

}

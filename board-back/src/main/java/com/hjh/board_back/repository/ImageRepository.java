package com.hjh.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hjh.board_back.entity.ImageEntity;
import java.util.List;


public interface ImageRepository extends JpaRepository<ImageEntity, Integer>{

    List<ImageEntity> findByBoardNumber(Integer boardNumber);
} 
package com.hjh.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hjh.board_back.entity.FavoriteEntity;
import com.hjh.board_back.entity.primaryKey.FavoritePk;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk>{

    
}
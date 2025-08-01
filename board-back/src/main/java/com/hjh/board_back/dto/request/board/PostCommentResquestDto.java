package com.hjh.board_back.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentResquestDto {

    @NotBlank
    private String content;

    
}

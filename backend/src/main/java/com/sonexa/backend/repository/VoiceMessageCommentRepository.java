package com.sonexa.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.SharedVoiceMessage;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessageComment;

@Repository
public interface VoiceMessageCommentRepository extends JpaRepository<VoiceMessageComment, UUID> {

    List<VoiceMessageComment> findBySharedVoiceMessageOrderByCreatedAtAsc(SharedVoiceMessage sharedVoiceMessage);

    List<VoiceMessageComment> findByAuthor(User author);

    @Query("SELECT vmc FROM VoiceMessageComment vmc WHERE vmc.sharedVoiceMessage = :sharedVoiceMessage AND vmc.parentCommentId IS NULL ORDER BY vmc.createdAt ASC")
    List<VoiceMessageComment> findTopLevelComments(@Param("sharedVoiceMessage") SharedVoiceMessage sharedVoiceMessage);

    @Query("SELECT vmc FROM VoiceMessageComment vmc WHERE vmc.parentCommentId = :parentId ORDER BY vmc.createdAt ASC")
    List<VoiceMessageComment> findReplies(@Param("parentId") UUID parentId);

    Long countBySharedVoiceMessage(SharedVoiceMessage sharedVoiceMessage);
}

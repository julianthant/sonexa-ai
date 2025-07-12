package com.sonexa.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.SharedVoiceMessage;
import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;

@Repository
public interface SharedVoiceMessageRepository extends JpaRepository<SharedVoiceMessage, UUID> {

    List<SharedVoiceMessage> findByTeam(Team team);

    List<SharedVoiceMessage> findByVoiceMessage(VoiceMessage voiceMessage);

    List<SharedVoiceMessage> findBySharedBy(User sharedBy);

    @Query("SELECT svm FROM SharedVoiceMessage svm WHERE svm.team IN (SELECT tm.team FROM TeamMember tm WHERE tm.user = :user)")
    Page<SharedVoiceMessage> findSharedWithUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT svm FROM SharedVoiceMessage svm WHERE svm.team = :team AND svm.status = :status")
    List<SharedVoiceMessage> findByTeamAndStatus(@Param("team") Team team, @Param("status") SharedVoiceMessage.ShareStatus status);

    boolean existsByVoiceMessageAndTeam(VoiceMessage voiceMessage, Team team);
}

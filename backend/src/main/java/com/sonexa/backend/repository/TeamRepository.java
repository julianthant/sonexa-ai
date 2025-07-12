package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.User;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {

    Optional<Team> findByTeamCode(String teamCode);

    List<Team> findByOwner(User owner);

    @Query("SELECT t FROM Team t JOIN t.members m WHERE m.user = :user")
    List<Team> findTeamsByMember(@Param("user") User user);

    @Query("SELECT t FROM Team t WHERE t.owner = :owner OR t.id IN (SELECT tm.team.id FROM TeamMember tm WHERE tm.user = :owner)")
    Page<Team> findUserTeams(@Param("owner") User owner, Pageable pageable);

    boolean existsByTeamCode(String teamCode);

    @Query("SELECT COUNT(tm) FROM TeamMember tm WHERE tm.team = :team")
    Long countMembersByTeam(@Param("team") Team team);
}

package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.TeamMember;
import com.sonexa.backend.model.User;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {

    List<TeamMember> findByTeam(Team team);

    List<TeamMember> findByUser(User user);

    Optional<TeamMember> findByTeamAndUser(Team team, User user);

    boolean existsByTeamAndUser(Team team, User user);

    @Query("SELECT tm FROM TeamMember tm WHERE tm.team = :team AND tm.role = :role")
    List<TeamMember> findByTeamAndRole(@Param("team") Team team, @Param("role") TeamMember.TeamRole role);

    Long countByTeam(Team team);

    void deleteByTeamAndUser(Team team, User user);
}

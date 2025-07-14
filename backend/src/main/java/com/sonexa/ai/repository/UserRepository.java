package com.sonexa.ai.repository;

import com.sonexa.ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * User Repository for Database Operations
 * 
 * This repository provides data access methods for User entity
 * with additional custom query methods for authentication and user management.
 * 
 * Features:
 * - Standard CRUD operations via JpaRepository
 * - Custom finder methods for authentication
 * - User statistics and analytics queries
 * - Email-based user lookup
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email address (username)
     * Used for authentication and user lookup
     * 
     * @param email user's email address
     * @return Optional containing user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if user exists by email
     * Used for registration validation
     * 
     * @param email email to check
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by role
     * Used for administrative operations
     * 
     * @param role user role to filter by
     * @return list of users with specified role
     */
    List<User> findByRole(User.Role role);
    
    /**
     * Find users created after specified date
     * Used for analytics and reporting
     * 
     * @param date cutoff date
     * @return list of users created after date
     */
    List<User> findByCreatedAtAfter(LocalDateTime date);
    
    /**
     * Count users by role
     * Used for dashboard statistics
     * 
     * @param role user role to count
     * @return number of users with specified role
     */
    long countByRole(User.Role role);
    
    /**
     * Count users created after specified date
     * Used for growth analytics
     * 
     * @param date cutoff date
     * @return number of users created after date
     */
    long countByCreatedAtAfter(LocalDateTime date);
    
    /**
     * Find enabled users only
     * Used for active user operations
     * 
     * @return list of enabled users
     */
    List<User> findByEnabledTrue();
    
    /**
     * Custom query to find users by name pattern
     * Used for user search functionality
     * 
     * @param searchTerm search pattern
     * @return list of matching users
     */
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<User> findByNameOrEmailContaining(@Param("searchTerm") String searchTerm);
    
    /**
     * Find users with recent activity
     * Used for engagement analytics
     * 
     * @param days number of days to look back
     * @return list of recently active users
     */
    @Query("SELECT u FROM User u WHERE u.updatedAt >= :cutoffDate")
    List<User> findRecentlyActiveUsers(@Param("cutoffDate") LocalDateTime cutoffDate);
}

<<<<<<< HEAD
# Base stage
FROM maven:3.9-eclipse-temurin-17-alpine AS base
=======
# Multi-stage build for Spring Boot application
FROM eclipse-temurin:17-jdk-alpine AS build
>>>>>>> 874431b7b2918034a2459313aa87d82245987fbe

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

<<<<<<< HEAD
# Development stage
FROM base AS development

# Copy source code
COPY src ./src
=======
# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create app user
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# Copy the jar file from build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership
RUN chown spring:spring app.jar

# Switch to app user
USER spring
>>>>>>> 874431b7b2918034a2459313aa87d82245987fbe

# Expose port
EXPOSE 8080

# Start in development mode with hot reload
CMD ["mvn", "spring-boot:run", "-Pdev"]

# Build stage
FROM base AS builder

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine AS production

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Create volume for logs
VOLUME /app/logs

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Default target
FROM production 
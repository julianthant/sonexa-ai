# Base stage
FROM maven:3.9-eclipse-temurin-17-alpine AS base

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Development stage
FROM base AS development

# Copy source code
COPY src ./src

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
# Multi-stage build for Spring Boot application
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests

# Development stage
FROM maven:3.9-eclipse-temurin-17-alpine AS development

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Expose port
EXPOSE 8080

# Start in development mode with hot reload
CMD ["mvn", "spring-boot:run", "-Pdev"]

# Production stage
FROM eclipse-temurin:17-jre-alpine AS production

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

# Create volume for logs
VOLUME /app/logs

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Default to production
FROM production 
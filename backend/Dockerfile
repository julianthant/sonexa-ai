# Stage 1: Build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first to leverage Docker layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Add non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Set default profile
ARG SPRING_PROFILES_ACTIVE=prod
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

# Azure App Service uses PORT environment variable
ENV SERVER_PORT=${PORT:-8080}

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]

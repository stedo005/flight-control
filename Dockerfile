FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN NODE_MAJOR=18
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.listRUN apt-get update && apt-get install nodejs -y
RUN apt-get update
RUN apt-get install nodejs -y
COPY . .
RUN ./gradlew bootJar --no-daemon

FROM openjdk:17
EXPOSE 8080
COPY --from=build backend/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
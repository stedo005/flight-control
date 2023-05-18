FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x  | bash -
RUN apt-get -y install nodejs
COPY . .
RUN ./gradlew bootJar --no-daemon

FROM openjdk:17
EXPOSE 8080
COPY --from=build backend/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
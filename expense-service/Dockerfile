FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew

RUN ./gradlew build -x test

EXPOSE 9898

CMD ["java", "-jar", "build/libs/expense-service-0.0.1-SNAPSHOT.jar"]
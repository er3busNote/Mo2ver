@echo off

:: 실행
java -jar ./build/libs/batch-0.0.1-SNAPSHOT.jar --spring.config.location=classpath:./,file:./build/resources/main/application.yml --spring.profiles.active=prod-local -Dfile.encoding=UTF-8 --job.name=cryptoJob type=decrypt
Read Messages Directly from Kafka:
```sh
docker-compose exec kafka sh
cd /user/bin
./kafka-console-consumer --topic test-topic --bootsrap-server
localhost:9092 --from-beginning
```
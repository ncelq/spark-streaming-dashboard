install

npm install express --save
npm install socket.io --save
npm install kafka-node --no-optional --save

run

node app.js

~/Software/kafka/bin/zookeeper-server-start.sh ~/Software/kafka/config/zookeeper.properties &
~/Software/kafka/bin/kafka-server-start.sh ~/Software/kafka/config/server.properties &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart1 &
~/Software/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test &
~/Software/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic chart1 --from-beginning

#./spark-shell --packages "org.apache.spark":"spark-streaming-kafka-0-10_2.11":"2.2.0" -i kafka.scala
./spark-shell --packages "org.apache.spark":"spark-sql-kafka-0-10_2.10":"2.2.0" -i tweet2.scala

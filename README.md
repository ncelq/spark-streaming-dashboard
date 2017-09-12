install

npm install express --save
npm install socket.io --save
npm install kafka-node --no-optional --save

run



~/Software/kafka/bin/zookeeper-server-start.sh ~/Software/kafka/config/zookeeper.properties &
~/Software/kafka/bin/kafka-server-start.sh ~/Software/kafka/config/server.properties &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart1 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart2 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart3 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart4 &
~/Software/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic chart4 &
~/Software/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic chart4 --from-beginning

node /Users/angusleigh/Documents/dashboard/app.js

./spark-shell --packages "org.apache.spark":"spark-sql-kafka-0-10_2.10":"2.2.0" -i main.scala

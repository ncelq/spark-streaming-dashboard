~/Software/kafka/bin/zookeeper-server-start.sh ~/Software/kafka/config/zookeeper.properties &
~/Software/kafka/bin/kafka-server-start.sh ~/Software/kafka/config/server.properties &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart1 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart2 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart3 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chart4 &
~/Software/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic table1 &

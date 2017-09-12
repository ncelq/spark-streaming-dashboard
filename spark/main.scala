val terms = Seq("fb","amzn","nflx")
val extract = udf { text: String => terms.filter(text.toLowerCase.contains) }

val firstFile = spark.read.json("/Users/angusleigh/Software/spark/temp/FB.json")
val data = spark.readStream.schema(firstFile.schema).json("/Users/angusleigh/Software/spark/temp/*.json")
//val data = spark.read.schema(firstFile.schema).json("/Users/angusleigh/Software/spark/temp/*.json")

val filtered = data.filter("entities.sentiment.basic is not null")


val chart1 = data.groupBy("entities.sentiment.basic").count.withColumnRenamed("basic","key").withColumnRenamed("count","y")
val chart2 = filtered.withColumn("body",explode(extract('body))).groupBy("entities.sentiment.basic","body").count.withColumnRenamed("basic","key").withColumnRenamed("body","label").withColumnRenamed("count","value")
val chart3 = data.withColumn("created_at",window('created_at, "30 minutes")).groupBy("entities.sentiment.basic","created_at").count.withColumnRenamed("basic","key")
val chart4 = filtered.withColumn("body",explode(extract('body))).groupBy("body").count.withColumnRenamed("body","key").withColumnRenamed("body","label").withColumnRenamed("count","value")

val run1 = new Thread(new Runnable {
  def run() {
    chart1.selectExpr("CAST(key AS STRING) AS key", "to_json(struct(*)) AS value").writeStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("topic","chart1").option("checkpointLocation", "/tmp/checkpoints0").outputMode("complete").start()
  }
})

val run2 = new Thread(new Runnable {
  def run() {
    chart2.selectExpr("CAST(key AS STRING) AS key", "to_json(struct(*)) AS value").writeStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("topic","chart2").option("checkpointLocation", "/tmp/checkpoints1").outputMode("complete").start()
  }
})

val run3 = new Thread(new Runnable {
  def run() {
    chart3.selectExpr("CAST(key AS STRING) AS key", "to_json(struct(*)) AS value").writeStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("topic","chart3").option("checkpointLocation", "/tmp/checkpoints2").outputMode("complete").start()
  }
})

val run4 = new Thread(new Runnable {
  def run() {
    chart4.selectExpr("CAST(key AS STRING) AS key", "to_json(struct(*)) AS value").writeStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("topic","chart4").option("checkpointLocation", "/tmp/checkpoints4").outputMode("complete").start()
  }
})


run1.start
run2.start
run3.start
run4.start

# NodeJs backend application to show proficient abilities in several technologies and concepts

This backend nodejs application is hosted in elastic beanstalk on AWS.  It is scalable and fault tolerant running on linux with cloud watch enabled on EC2.  The use case is a simple one that allows the frontend application (wwwdemo in my repositories) to enter new items to a tree that contains random positive numbers between two bounds set by the frontend user.  The data is system stateful meaning that the data from client frontend is sent to mongodb and concurrently a custom memcache. That data is synchronized (broadcasted) via websockets to all connected clients.

* Technologies and Concepts:
  * NodeJS
  * Socket io (Web Sockets)
  * AWS Beanstalk, EC2, S3
  * memory caching
  * mongoDB
  * data layer structure

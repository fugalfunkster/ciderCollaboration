# ciderCollaboration

RESTful APIs to back applications for cidermakers.

## Amazon AWS Setup

1. Spin up a PostgreSQL RDS instance. Do not make the instance publicly accessible. Take
   note of the address, port, database name, user name and password.

2. Execute the schema DDL queries in [ddl.sql](./ddl.sql) against your RDS instance. You
   may need to make the instance public while performing this step to enable use of tools
   such as `pgadmin` from your local computer.   

3. Spin up a new Ubuntu 16.04 EC2 instance. The economical `t2.nano` instance type is sufficient
   for development work.

4. Ensure that your RDS instance's security group is configured to allow inbound PostgreSQL
   traffic from your EC2 instance's security group.

5. On your EC2 instance:
    
    a. Install and configure Node and Nginx per instructions [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04).

    b. Set your RDS database server address, port, database name, user name and password
       as durable environment variables `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and 
       `PGPASSWORD`, respectively.
    
    c. Clone this repository to your EC2 instance.
    
    d. Install dependencies (`npm install`).
    
    e. Run the application using `PM2` per instructions in (a) above.

6. Make an API request to your EC2 instance's public IP address and confirm that you get the
   expected HTTP status code and response.

## API Reference

1. [RESTful API Design](./docs/api.md) - the bedrock upon which all APIs in this project rest.
2. Resources
    * `/api/v1/apples`

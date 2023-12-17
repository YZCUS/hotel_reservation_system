# Project: Hotel reservation system
This a hotel reservation application built by React, Spring boot and PostgreSQL. Users can sign up and log in to book their stay for their vacation.

## Description:
With a variety of hotel brands worldwide, finding and booking the perfect room for a holiday can be a challenging task, often requiring visits to numerous individual websites. To streamline this process, our project aims to develop a third-party web application, offering a centralized and user-friendly platform that aggregates rooms from various hotel brands, simplifying the search and reservation experience for users looking to find their ideal stay. 


## Getting Started
### Enviromnent:
- Docker: 24.0.8
- Docker Compose: 2.23.0

### Installing
- Clone this repository and navigate to directory
```bash
git clone https://github.com/YZCUS/hotel_reservation_system_backend.git
cd hotel_reservation_system_backend
```

- Build application
```bash
docker-compose build
```

- If failed or the target folder did not generate
```bash
./mvnw package -DskipTests
```

```bash
docker-compose build --no-cache
```

### Executing program
Open new terminals to execute Server and Client following the instructions:
  
- Run Server
```bash
cd hotel_reservation_system_backend
```

```bash
docker-compose up
```

- Run Client (Open web browser)
visit: http://localhost:8080/
echo $(ls pg-local-db)

if [ -d "pg-local-db" ]; then
  cd pg-local-db && \
  docker-compose up -d;
  cd ..;
fi

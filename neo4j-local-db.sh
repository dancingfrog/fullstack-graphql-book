if [ -d "neo4j-local-db" ]; then
  cd neo4j-local-db;
  bash neo4j-docker.sh;
  cd ..
fi

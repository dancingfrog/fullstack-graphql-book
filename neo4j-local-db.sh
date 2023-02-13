echo $(ls data)

if [ -d "neo4j-local-db" ]; then
  cp data/grandstack_businesses.csv neo4j-local-db/import && \
  cp neo4j-docker.sh neo4j-local-db && \
  cd neo4j-local-db && \
  bash neo4j-docker.sh;
  cd ..;
fi

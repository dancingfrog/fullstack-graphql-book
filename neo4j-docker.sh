echo $(pwd)

echo $(ls import)

export container=$(docker run -d \
    --env NEO4J_AUTH=neo4j/letmein \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$(pwd)/conf:/var/lib/neo4j/conf \
    --volume=$(pwd)/data:/var/lib/neo4j/data \
    --volume=$(pwd)/import:/var/lib/neo4j/import \
    --volume=$(pwd)/plugins:/var/lib/neo4j/plugins \
    neo4j:5.1.0)

docker logs -f $container &

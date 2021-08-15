docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
docker exec -it quiz_test_api bash -c "npm install && npm run componentTests"
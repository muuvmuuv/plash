# Run in docker
run:
  docker compose up -d

# Show container logs
logs:
  docker compose logs -f --tail=100

# Create certificate
cert:
  mkdir -p certs
  mkcert -ecdsa \
  -cert-file certs/dev.crt \
  -key-file certs/dev.key \
  plash.local
  cat certs/dev.crt certs/dev.key > unit/dev.pem
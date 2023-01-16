# Run docker
up:
  docker compose up -d

# Rebuild and restart
rebuild:
  pnpm build
  swift build --package-path api
  docker compose restart

# Start and run the api directly
api:
  swift run --package-path api
# Start and ... watch for changes
api-watch:
  ls **/*.swift | entr -r swift run --package-path api

# Create local certificate
cert:
  mkdir -p certs
  mkcert -ecdsa \
  -cert-file certs/dev.crt \
  -key-file certs/dev.key \
  plash.local
  cat certs/dev.crt certs/dev.key > unit/dev.pem
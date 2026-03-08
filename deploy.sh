set -euo pipefail

IMAGE_REF="$1"
APP_NAME="bestapplication"
PORT="3000"

docker pull "$IMAGE_REF"

if docker ps -a --format '{{.Names}}' | grep -qx "$APP_NAME"; then
  docker stop "$APP_NAME" || true
  docker rm "$APP_NAME" || true
fi

docker run -d \
  --name "$APP_NAME" \
  -p ${PORT}:3000 \
  -e APP_VERSION="${GITHUB_SHA:-github}" \
  "$IMAGE_REF"

docker ps
docker logs --tail 20 "$APP_NAME" || true

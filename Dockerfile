FROM docker.io/library/node:15 as builder

WORKDIR /opt/builder

COPY . .

RUN yarn install && \
    yarn build

# ---------------------------------

FROM docker.io/library/node:15-alpine

# metadata
ARG VERSION=""
ARG VCS_REF=master
ARG BUILD_DATE=""

LABEL summary="Crown Sterling API" \
	name="crown-sterling/csov-api" \
	maintainer="devops@crownsterling.io" \
	version="${VERSION}" \
	description="Crown Sterling API" 

WORKDIR /usr/src/app

COPY --from=builder /opt/builder /usr/src/app

ENV SAS_EXPRESS_PORT=8080
ENV SAS_EXPRESS_BIND_HOST=0.0.0.0
ENV SAS_SUBSTRATE_TYPES=/usr/src/app/sc-types.json


EXPOSE ${SAS_EXPRESS_PORT}
CMD [ "node", "build/src/main.js" ]

ARG IMAGE_DOCKER

FROM $IMAGE_DOCKER as builder
ARG CI_COMMIT_REF_NAME
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN if [ "$CI_COMMIT_REF_NAME" == "develop" ] || [ "$CI_COMMIT_REF_NAME" == "stage" ] || [ "$CI_COMMIT_REF_NAME" == "prod" ]; then yarn build:$CI_COMMIT_REF_NAME; else yarn build:develop; fi

                                    
FROM $IMAGE_DOCKER as executor
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV PORT 3000
CMD ["node", "server.js"]
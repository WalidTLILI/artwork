# import config.
# You can change the default config with `make cnf="config_special.env" build`
cnf ?= .env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

# grep the version from the mix file
VERSION=$(shell ./version.sh)

# DOCKER TASKS
# Build the container
build: ## Build the container
	docker-compose build

build-nc: ## Build the container without caching
	docker-compose build --no-cache

run: ## Run container on port configured in `dev.env`
	docker-compose up -d --remove-orphans

up: build run ## Run container on port configured in `dev.env` (Alias to run)

down: ## Stop and remove a running container
	docker-compose down -v --remove-orphans

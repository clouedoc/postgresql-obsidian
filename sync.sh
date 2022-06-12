#!/bin/bash

export WORKSPACE_USERNAME=''
export WORKSPACE_HOST=''
export PLUGIN_PATH='./postgresql-obsidian'

mkdir $PLUGIN_PATH || true

scp -o User=$WORKSPACE_USERNAME $WORKSPACE_HOST:/workspace/postgresql-obsidian/main.js $PLUGIN_PATH/
scp -o User=$WORKSPACE_USERNAME $WORKSPACE_HOST:/workspace/postgresql-obsidian/styles.css $PLUGIN_PATH/
scp -o User=$WORKSPACE_USERNAME $WORKSPACE_HOST:/workspace/postgresql-obsidian/manifest.json $PLUGIN_PATH/
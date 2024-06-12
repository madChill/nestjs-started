#!/bin/bash
echo
echo Building image started
echo

service=user-service
repo=708927267906.dkr.ecr.ap-southeast-1.amazonaws.com/user-service

version=$(aws ecr describe-images --repository-name $service \
--query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]')

major=0
minor=0
build=0

# break down the version number into it's components
regex="([0-9]+).([0-9]+).([0-9]+)"
if [[ $version =~ $regex ]]; then
  major="${BASH_REMATCH[1]}"
  minor="${BASH_REMATCH[2]}"
  build="${BASH_REMATCH[3]}"
fi

# check paramater to see which number to increment
if [[ "$1" == "feature" ]]; then
  minor=$(echo $minor + 1 | bc)
elif [[ "$1" == "bug" ]]; then
  build=$(echo $build + 1 | bc)
elif [[ "$1" == "major" ]]; then
  major=$(echo $major+1 | bc)
else
  echo "usage: ./deploy.sh [major/feature/bug]"
  exit -1
fi

echo $repo:$major.$minor.$build

# echo the new version number
docker build -t $service .
docker tag $service:latest $repo:$major.$minor.$build
docker push $repo:$major.$minor.$build

echo "New image pushed, Version: $major.$minor.$build"
#!/bin/bash

SLUG=$1
TITLE=$2
DATETIME=`date "+%Y-%m-%dT%H:%M:%S"`

# quick check on args
if [ "$SLUG" == "" ] || [ "$TITLE" == "" ]
then
    echo "Usage: $0 blog_post_slug 'blog title string'"
    exit 1
fi

# get next blog post number
BLOG_POST_DIR='./content/blog'
LATEST_POST_NUM=`ls $BLOG_POST_DIR | grep ^[0-9] | sort | tail -1 | cut -d- -f1`
POST_NUM=`expr $LATEST_POST_NUM + 1`
PADDED_POST_NUM=`printf %04d $POST_NUM`

# check that it doesn't exist yet
NEW_POST_DIR="$BLOG_POST_DIR/${PADDED_POST_NUM}-$SLUG"

if [ -d "$NEW_POST_DIR" ]
then
    echo "New post directory already exists: $NEW_POST_DIR"
    exit
fi

echo "Creating $NEW_POST_DIR..."

mkdir $NEW_POST_DIR
NEW_POST_FILE="$NEW_POST_DIR/index.md"
cp blog_template.md $NEW_POST_FILE

# replace date, title, etc.
sed -i '' "s/PATH_GOES_HERE/$SLUG/" $NEW_POST_FILE
sed -i '' "s/TITLE_GOES_HERE/$TITLE/" $NEW_POST_FILE
sed -i '' "s/DATE_GOES_HERE/$DATETIME/" $NEW_POST_FILE

echo "done!"

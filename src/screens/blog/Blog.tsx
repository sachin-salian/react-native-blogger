import React, { useEffect, useRef } from "react";
import { Icon, Layout, Text } from "@ui-kitten/components";
import { SharedElement } from "react-native-shared-element";
import { Image, NativeScrollEvent, ScrollView } from "react-native";
import Header from "../../components/header/Header";
import { IBlogData } from "../../constants/Schema";
import { NavigationProp } from "@react-navigation/native";
import { Routes } from "../../constants/Constants";
import styles from "./Blog.style";
import dayjs from "dayjs";
import { schedulePushNotification } from "../../utils/Notifications";

type BlogNav = {
  [Routes.Blog]: undefined;
};

interface BlogProps {
  navigation?: NavigationProp<BlogNav>;
  route?: {
    params: {
      data: IBlogData;
    };
  };
}

const NOTIFICATION_SCROLL_THRESHOLD = 70;

const Blog = (props: BlogProps) => {
  const {
    route: {
      params: {
        data,
        data: { title, author, content, datePublished, imageUrl, views },
      },
    },
  } = props;
  const contentScrollPercentage = useRef<number>();

  useEffect(() => {
    return () => {
      // Create remainder notification every 3 hrs to continue reading, if user read percentage is within 70.
      if (
        (contentScrollPercentage?.current ?? 0) < NOTIFICATION_SCROLL_THRESHOLD
      ) {
        schedulePushNotification(title, "Continue Reading...", data, 3, 0);
      }
    };
  });

  const formatedDate = dayjs(datePublished).format("MMM D, h:mm A");

  const onScrollContent = ({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const percentageScrolled =
      ((layoutMeasurement.height + contentOffset.y) / contentSize.height) * 100;
    contentScrollPercentage.current = percentageScrolled;
  };

  return (
    <Layout style={styles.mainContainer}>
      <Header title="" showBackArrow={true} />
      <ScrollView onScroll={onScrollContent} scrollEventThrottle={400}>
        <Layout style={styles.contentView}>
          <Layout style={styles.iconTextView}>
            <Icon style={styles.iconPerson} fill="#8F9BB3" name="person" />
            <Text style={styles.blogAuther}>{author}</Text>
          </Layout>
          <Layout style={styles.timeReadView}>
            <Layout style={styles.iconTextView}>
              <Icon name="clock" fill="#8F9BB3" style={styles.iconTime} />
              <Text style={styles.blogTime}>{formatedDate}</Text>
            </Layout>
            <Layout style={styles.iconTextView}>
              <Icon name="eye" fill="#8F9BB3" style={styles.iconViews} />
              <Text style={styles.blogViewsCount}>{`${views}`}</Text>
            </Layout>
          </Layout>
          <Text style={styles.blogTitle}>{title}</Text>
          <SharedElement id={`item.${imageUrl}.photo`}>
            <Image style={styles.blogImage} source={{ uri: imageUrl }} />
          </SharedElement>
          <Text style={styles.blogContent}>{content}</Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default Blog;

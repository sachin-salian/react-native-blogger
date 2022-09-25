import { useNavigation } from "@react-navigation/native";
import { Layout, Icon, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { SharedElement } from "react-native-shared-element";
import { Image, TouchableOpacity } from "react-native";
import { Routes } from "../../constants/Constants";
import { IBlogData } from "../../constants/Schema";
import styles from "./BlogItem.style";

export interface BlogItemProps extends IBlogData {}

const BlogItem = (props: BlogItemProps) => {
  const { title, author, content, views, datePublished, imageUrl } = props;
  const navigation = useNavigation();
  const formatedDate = dayjs(datePublished).format("MMM D");

  const onPressItem = () => {
    navigation.push(Routes.Blog, {
      data: props,
    });
  };

  return (
    <TouchableOpacity onPress={onPressItem}>
      <Layout style={styles.itemView}>
        <Layout style={styles.leftView}>
          <Layout style={styles.authorView}>
            <Icon style={styles.icon} fill="#8F9BB3" name="person" />
            <Text style={styles.blogAuther}>{author}</Text>
          </Layout>
          <Text style={styles.blogTitle}>{title}</Text>
          <Text style={styles.blogTime}>{formatedDate}</Text>
        </Layout>
        <Layout style={styles.rightView}>
          <SharedElement id={`item.${imageUrl}.photo`}>
            <Image style={styles.blogImage} source={{ uri: imageUrl }} />
          </SharedElement>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

export default BlogItem;

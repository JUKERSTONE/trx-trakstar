import { useContext, useState, useEffect } from "react";
import { Linking } from "react-native";
import { useProvider } from "../../../3.stores";
import axios from "axios";
import { GET_NEWS } from "../../../1.api";
import Share from "react-native-share";

export const useLandingNews = () => {
  const [news, setNews] = useState([]);
  const { state } = useContext(useProvider);

  useEffect(() => {
    handleLatestNews();
  }, []);

  const handleLatestNews = () => {
    axios
      .get(GET_NEWS, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: useLandingNews.ts ~ line 24 ~ .then ~ response",
          response
        );
        setNews(response.data.news);
      });
  };

  const share = (title: string, url: string) => {
    // const options = {
    //   title: 'TRAKLIST',
    //   message:
    //     "TRAKLIST | Latest Music News : '" +
    //     title +
    //     '. ' +
    //     url +
    //     '. Discover this and much more on TRAKLIST.',
    //   url: 'www.example.com',
    //   // subject: 'Subject'
    // };
    // Share.open(options)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     err && console.log(err);
    //   });
    // Linking.canOpenURL(url).then((supported) => {
    //   if (supported) {
    //     Linking.openURL(url);
    //   } else {
    //     // console.log("Don't know how to open URI: " + url);
    //   }
    // });
  };

  return {
    news,
    share,
  };
};

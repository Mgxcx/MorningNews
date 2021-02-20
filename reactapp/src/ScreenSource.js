import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { List, Avatar } from "antd";

import Nav from "./Nav";

function ScreenSource(props) {
  const [sourceList, setsourceList] = useState([]);
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const recentNews = async () => {
      let rawResponse = await fetch(
        `https://newsapi.org/v2/sources?language=${language}&country=${country}&apiKey=83d4277d163c4d8680c565f183fcef24`
      );
      let response = await rawResponse.json();
      setsourceList(response.sources);
      console.log(language, country);
    };
    recentNews();
  }, [language, country]);
  // console.log(sourceList);

  const handleSubmitLanguage = async () => {
    let rawResponse = await fetch("/addlanguage", {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `language=${language}&country=${country}`,
    });
    let response = await rawResponse.json();
  };

  return (
    <div>
      <Nav />
      <div className="Banner">
        <div className="flag">
          <Avatar
            style={{ cursor: "pointer" }}
            size={52}
            src="./images/france.png"
            onClick={() => {
              setLanguage("fr");
              setCountry("fr");
              handleSubmitLanguage(props);
            }}
          />
          <Avatar
            style={{ cursor: "pointer" }}
            size={52}
            src="./images/uk.png"
            onClick={() => {
              setLanguage("en");
              setCountry("gb");
              handleSubmitLanguage();
              props.addLanguage({ language: language, country: country });
            }}
          />
        </div>
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => {
            let avatar;
            if (item.category === "general") {
              avatar = "./images/general.png";
            } else if (item.category === "sports") {
              avatar = "./images/sports.png";
            } else {
              avatar = "./images/business.png";
            }

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={avatar} />}
                  title={<Link to={`/articlesbysource/${item.id}`}>{item.name}</Link>}
                  description={item.description}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: function (language) {
      console.log("Dispatch", language);
      dispatch({ type: "addLanguage", language });
    },
  };
}

function mapStateToProps(state) {
  console.log("State", state);
  return { userToken: state.token, language: state.language };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);

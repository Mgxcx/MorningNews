import React from "react";

import { connect } from "react-redux";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <Nav />

      <div className="Banner" />
      {props.myArticles.length > 0 ? (
        <div className="Card">
          {props.myArticles.map((article) => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                  style={{
                    width: 300,
                    margin: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={<img alt="example" src={article.image} />}
                  actions={[
                    <Icon type="read" key="ellipsis2" onClick={showModal} />,

                    <Icon
                      type="delete"
                      key="ellipsis"
                      onClick={() => props.deleteToWishList(article.title)}
                    />,
                  ]}
                >
                  <Modal
                    title={article.title}
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <p>{article.content}</p>
                  </Modal>

                  <Meta
                    title={article.title}
                    description={article.description}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <h4 className="wishlistvide">Aucun article trouvé dans vos favoris </h4>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return { myArticles: state.wishlist };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList(title) {
      dispatch({ type: "deleteArticle", title });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);

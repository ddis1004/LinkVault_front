import { View, Text } from "react-native";
import React from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";

const AccountPage = () => {
  return (
    <OuterContainer>
      <Header title={"내 정보"}></Header>
    </OuterContainer>
  );
};

export default AccountPage;
